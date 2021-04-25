import {SyntheticEvent,useEffect,useMemo,useRef,useState} from 'react';
import React from 'react';
import useCounter from "./useCounter";
import useCalculateScrollBarWidth from './useCalculateScrollBarWidth';
import mixExec from '../../function/mixExec';
import useTimeout from '../../hooks/useTimeout';

type DivFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,HTMLDivElement>

export type ScrollContainer = {trackHeight?:number,scrollTop?: number,viewHeight?: number,scrollHeight?: number}

export type EventName = "onUpdatable" | "onUpdating" | "onDisUpdate"| "onCompleted"|"onEnd"|"onCancelUpdate" | "onUpGlideLoad"

export type StatusToOtherMap<Type> = Type extends "Event" ? {[key in EventName]:()=>void}:{[key in Status]:Exclude<EventName,"onCancelUpdate"|"onUpGlideLoad">}

export type EventMap = Partial<StatusToOtherMap<"Event">>


export type ableStatus = 'updatable'|'updating'|'completed'|'none'
export type disStatus =  'disUpdate'|'none'
export type Status = ableStatus|disStatus

export interface GetScrollPropsMap {
  getScrollContainerProps:DivFunc,getScrollBarProps:DivFunc,getPullingAnimationProps:DivFunc,getTrackProps:DivFunc
}
export interface useScrollProps {
  onEvent?:()=>EventMap
  waitingDistance?:number
  updatableDistance?:number
  maxDropDownDistance?:number
  completedWaitTime?:number
  upGlideLoading?:boolean
  dropDownUpdating?:boolean
  enableUpGlideLoad?:boolean // 启用下滑加载 default false
  disableDropDownUpdate?:boolean // 禁用下拉更新 default false
}

const lifeCycleMap:{"disUpdate":disStatus[],"updatable":ableStatus[]} = {
  'updatable':['updatable','updating','completed','none'],
  'disUpdate':['disUpdate','none']
}

const statusToEvent:StatusToOtherMap<"EventName"> = {
  'updatable': 'onUpdatable','updating': 'onUpdating','disUpdate': 'onDisUpdate','completed': 'onCompleted','none': 'onEnd'
};

const statusList:Status[] = Array.from(new Set(lifeCycleMap['updatable'].concat(lifeCycleMap['disUpdate'] as ableStatus[])))


const useScrollBarPos = (props: useScrollProps) => {
  const {updatableDistance=100,waitingDistance = 60,onEvent,maxDropDownDistance=9999,completedWaitTime=0,upGlideLoading=false,dropDownUpdating=false,disableDropDownUpdate=false,enableUpGlideLoad=false} = props;
  const {count,increment,reset} = useCounter()
  const {setTimeout} = useTimeout()
  
  const [barHeight,setBarHeight] = useState(0);
  const [barTop,_setBarTop] = useState(0);
  const [pullTop,_setPullTop] = useState(0);
  const [status,_setStatus] = useState<Status>('none');
  const [lifeLine,setLifeLine] = useState<(disStatus|ableStatus)[]>([])
  const [barVisible,setBarVisible] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const barFirstClientYRef = useRef(0);
  const barFirstTopRef = useRef(0);
  const isPullingRef = useRef(true);
  const touchLastClientYRef = useRef(0);
  const touchTriggerRef = useRef(false)
  const lastScrollTop = useRef<number>(0)
  
  useEffect(() => {
    const onStatusEventMap:Omit<StatusToOtherMap<"Event">,'onCancelUpdate'|'onUpGlideLoad'> = {
      onUpdatable, onUpdating,onDisUpdate, onCompleted,onEnd
    };
    onStatusEventMap[statusToEvent[status]]() // 内部事件
    onEvent?.()[statusToEvent[status]]?.() // 用户事件
  },[status,touchTriggerRef.current]);
  useEffect(()=>{
    setStatus(lifeLine[count])
  },[lifeLine,count])
  useEffect(() => {
    document.addEventListener('mouseup',onMouseUpBar);
    document.addEventListener('mousemove',onMouseMoveBar);
    document.addEventListener('selectstart',onSelectStart);
    return () => {
      document.removeEventListener('mouseup',onMouseUpBar);
      document.removeEventListener('mousemove',onMouseMoveBar);
      document.removeEventListener('selectstart',onSelectStart);
    };
  },[]);
  
  useEffect(()=>{
    if(status==='updating'&&!dropDownUpdating)
      increment()
  },[dropDownUpdating])
  
  useEffect(()=>{
    if(!upGlideLoading)
    setBarPosState(getSizes());
  },[upGlideLoading])
  
  const {scrollBarWidth} = useCalculateScrollBarWidth();
  const animationStyle = useMemo(()=>({transition:touchTriggerRef.current?`none 0s`:`transform 0.25s`}),[touchTriggerRef.current])
  const updatableRate = useMemo(()=>pullTop>=updatableDistance?100:pullTop/updatableDistance*100,[pullTop,updatableDistance])
  
  const getSizes = () => {
    const {current} = containerRef;
    return {
      current,viewHeight: current!.clientHeight,scrollHeight: current!.scrollHeight,scrollTop: current!.scrollTop,trackHeight:trackRef.current?.clientHeight
    };
  };
  const setBarPosState = ({scrollTop,viewHeight,scrollHeight,trackHeight}: ScrollContainer) => {
    setBarVisible(true)
    setTimeout(1,()=>{
      setBarVisible(false)
    },5000)
    setBarHeight(viewHeight===scrollHeight?0:calculateBarHeight({trackHeight,viewHeight,scrollHeight}));
    setBarTop(calculateBarTop({scrollTop,trackHeight,scrollHeight}));
  };
  
  const setStatus = (status: Status) => {
    status&&_setStatus((s)=>{
      if(s==='updating'&&(status==='updatable'||status==='disUpdate'))
        onCancelUpdate?.()
      if(statusList.indexOf(status)===-1)
        return s
      return status
    });
  };
  const setPullTop = (number: number) => {
    if (number>maxDropDownDistance) number = maxDropDownDistance
    if (number < 0) number = 0;
    _setPullTop(number);
  };
  const setBarTop = (number: number) => {
    if (number <= 0) return;
    const {scrollHeight,viewHeight} = getSizes();
    const scrollBarMaxTop = (scrollHeight - viewHeight) / scrollHeight * viewHeight;
    if (number >= scrollBarMaxTop) return;
    _setBarTop(number);
  };
  
  const calculateBarHeight = ({trackHeight=0,viewHeight = 0,scrollHeight = 0}: ScrollContainer) => {
    return trackHeight*viewHeight / scrollHeight;
  };
  const calculateBarTop = ({scrollTop = 0,trackHeight = 0,scrollHeight = 0}: ScrollContainer) => {
    return scrollTop * trackHeight / scrollHeight;
  };

  const onMouseUpBar = () => {
    isDraggingRef.current = false;
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    const {scrollHeight,viewHeight,current} = getSizes();
    if (!isDraggingRef.current) return;
    const delta = e.clientY - barFirstClientYRef.current;
    const newScrollBarTop = delta + barFirstTopRef.current;
    setBarTop(newScrollBarTop);
    current!.scrollTop = scrollHeight * newScrollBarTop / viewHeight;
  };
  const onMouseDownBar = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    isDraggingRef.current = true;
    barFirstClientYRef.current = e.clientY;
    barFirstTopRef.current = barTop;
  };
  const onSelectStart = (e: Event) => {
    if (isDraggingRef.current) e.preventDefault();
  };
  
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchTriggerRef.current = true
    const {scrollTop} = getSizes();
    isPullingRef.current = scrollTop === 0;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const {scrollTop} = getSizes();
    isPullingRef.current = scrollTop === 0;
    const delta = e.targetTouches[0].clientY - touchLastClientYRef.current;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
    if (!isPullingRef.current && pullTop === 0) return;
    const newPullTop = delta + pullTop
    setPullTop(newPullTop);
    setStatus(newPullTop>=updatableDistance?'updatable':'disUpdate')
  };
  const onTouchEnd = () => {
    touchTriggerRef.current = false
    if (isPullingRef.current) {
      reset()
      if(pullTop>=updatableDistance){
        setLifeLine(lifeCycleMap['updatable'])
      }else{
        setLifeLine(lifeCycleMap['disUpdate'])
      }
    }
  };
  
  const onUpGlideLoad = ({scrollTop,scrollHeight,viewHeight}:{scrollTop:number,scrollHeight:number,viewHeight:number})=>{
    if(scrollTop+viewHeight+300>=scrollHeight&&lastScrollTop.current<scrollTop&&enableUpGlideLoad&&!upGlideLoading)
      onEvent?.()['onUpGlideLoad']?.()
  }
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.preventDefault();
    const containerInfo = getSizes()
    const {scrollTop,scrollHeight,viewHeight} = containerInfo
    if (pullTop !== 0)
      e.currentTarget.scrollTop = 0;
    setBarPosState(containerInfo);
    onUpGlideLoad({scrollTop,scrollHeight,viewHeight})
    lastScrollTop.current = scrollTop
  };
  const onTransitionEnd = ()=>{
    if(status==='completed'||status==="disUpdate"){
      increment()
    }
  }
  const onSelect = (e: SyntheticEvent<HTMLDivElement>) => e.preventDefault();
  
  const onUpdatable=()=> {
    if(!touchTriggerRef.current)
    increment()
  }
  const onDisUpdate=()=> {
    if(!touchTriggerRef.current)
      setPullTop(0)
  }
  const onUpdating=()=> {
    setPullTop(waitingDistance)
  }
  const onCompleted=()=> {
    if(completedWaitTime!==0){
       setTimeout(2,()=>{
        setPullTop(0)
      },completedWaitTime)
    }else{
      setPullTop(0)
    }
  }
  const onCancelUpdate = ()=>{
    onEvent?.()['onCancelUpdate']?.()
  }
  
  const onEnd = ()=>{
  }
  
  const downGlideUpdated = () => {
    if(status==='updating')
      increment()
  };
  
  const getScrollContainerProps: DivFunc = (props) => {
    const ref = containerRef;
    const _onTouchStart = !disableDropDownUpdate?onTouchStart:()=>{}
    const _onTouchMove = !disableDropDownUpdate?onTouchMove:()=>{}
    const _onTouchEnd = !disableDropDownUpdate?onTouchEnd:()=>{}

    return {
      style:{right: -scrollBarWidth,transform: `translateY(${pullTop}px)`,...animationStyle,...props?.style},
      onTouchStart: mixExec(props?.onTouchStart)(_onTouchStart),
      onTouchMove: mixExec(props?.onTouchMove)(_onTouchMove),
      onTouchEnd: mixExec(props?.onTouchEnd)(_onTouchEnd),
      onScroll: mixExec(props?.onScroll)(onScroll),
      onSelect: mixExec(props?.onSelect)(onSelect),
      onTransitionEnd: mixExec(props?.onTransitionEnd)(onTransitionEnd),
      ref,
      ...props
    };
  };
  const getScrollBarProps: DivFunc = (props) => {
    return {
      style:{transform: `translateY(${barTop}px)`,height: barHeight,opacity:barVisible?1:0,...props?.style,...props?.style},
      onMouseDown: mixExec(props?.onMouseDown)(onMouseDownBar),
      ...props
    };
  };
  const getPullingAnimationProps:DivFunc= (props)=>{
    return {
      style:{transform:`translateY(${pullTop-30}px)`,...animationStyle,...props?.style},
      ...props
    }
  }
  const getTrackProps:DivFunc=(props)=>{
    return {
      style:{width: scrollBarWidth},
      ref:trackRef,
      ...props
    }
  };
  
  return {
    getScrollPropsMap:{
      getScrollContainerProps,getScrollBarProps,getPullingAnimationProps,getTrackProps
    },
    status,touchTrigger:touchTriggerRef.current,updatableRate,downGlideUpdated
  };
};

export default useScrollBarPos;