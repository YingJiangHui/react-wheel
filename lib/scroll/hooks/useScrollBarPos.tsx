import {SyntheticEvent,useEffect,useMemo,useRef,useState} from 'react';
import React from 'react';
import useCounter from "./useCounter";
import useCalculateScrollBarWidth from './useCalculateScrollBarWidth';
import mixExec from '../../function/mixExec';

type DivFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,HTMLDivElement>

export type ScrollContainer = {scrollTop?: number,viewHeight?: number,scrollHeight?: number}

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
  const {updatableDistance=100,waitingDistance = 60,onEvent,maxDropDownDistance=9999,completedWaitTime=0} = props;
  
  const {count,increment,reset} = useCounter()
  const [barHeight,setBarHeight] = useState(0);
  const [barTop,_setBarTop] = useState(0);
  const [pullTop,_setPullTop] = useState(0);
  const [status,_setStatus] = useState<Status>('none');
  const [lifeLine,setLifeLine] = useState<(disStatus|ableStatus)[]>([])
  
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const barFirstClientYRef = useRef(0);
  const barFirstTopRef = useRef(0);
  const isPullingRef = useRef(true);
  const touchLastClientYRef = useRef(0);
  const touchTriggerRef = useRef(false)
  const timerRef = useRef<number>()
  const isUpGlideLoad = useRef<boolean>(true)
  
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
    setBarPosState(getContainerInfo());
    document.addEventListener('mouseup',onMouseUpBar);
    document.addEventListener('mousemove',onMouseMoveBar);
    document.addEventListener('selectstart',onSelectStart);
    return () => {
      document.removeEventListener('mouseup',onMouseUpBar);
      document.removeEventListener('mousemove',onMouseMoveBar);
      document.removeEventListener('selectstart',onSelectStart);
      window.clearTimeout(timerRef.current)
    };
  },[]);

  const {scrollBarWidth} = useCalculateScrollBarWidth();
  const animationStyle = useMemo(()=>({transition:touchTriggerRef.current?`none 0s`:`transform 0.25s`}),[touchTriggerRef.current])
  const updatableRate = useMemo(()=>pullTop>=updatableDistance?100:pullTop/updatableDistance*100,[pullTop,updatableDistance])
  
  const getContainerInfo = () => {
    const {current} = containerRef;
    return {
      current,viewHeight: current!.getBoundingClientRect().height,scrollHeight: current!.scrollHeight,scrollTop: current!.scrollTop
    };
  };
  const setBarPosState = ({scrollTop,viewHeight,scrollHeight}: ScrollContainer) => {
    setBarHeight(calculateBarHeight({viewHeight,scrollHeight}));
    setBarTop(calculateBarTop({scrollTop,viewHeight,scrollHeight}));
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
    const {scrollHeight,viewHeight} = getContainerInfo();
    const scrollBarMaxTop = (scrollHeight - viewHeight) / scrollHeight * viewHeight;
    if (number >= scrollBarMaxTop) return;
    _setBarTop(number);
  };
  
  const calculateBarHeight = ({viewHeight = 0,scrollHeight = 0}: ScrollContainer) => {
    return Math.pow(viewHeight,2) / scrollHeight;
  };
  const calculateBarTop = ({scrollTop = 0,viewHeight = 0,scrollHeight = 0}: ScrollContainer) => {
    return scrollTop * viewHeight / scrollHeight;
  };

  const onMouseUpBar = () => {
    isDraggingRef.current = false;
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    const {scrollHeight,viewHeight,current} = getContainerInfo();
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
    const {scrollTop} = getContainerInfo();
    isPullingRef.current = scrollTop === 0;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const {scrollTop} = getContainerInfo();
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
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const containerInfo = getContainerInfo()
    const {scrollTop,scrollHeight,viewHeight} = containerInfo
    if (pullTop !== 0) {
      e.currentTarget.scrollTop = 0;
    }
    e.preventDefault();
    setBarPosState(containerInfo);
    if(scrollTop+viewHeight+100>=scrollHeight)
      onUpGlideLoad()
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
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(()=>{
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
  const onUpGlideLoad = ()=>{
    if(isUpGlideLoad.current){
      isUpGlideLoad.current = false
      onEvent?.()['onUpGlideLoad']?.()
    }
  }
  
  const upGlideLoaded = ()=>{
    isUpGlideLoad.current = true
  }
  
  const downGlideUpdated = () => {
    if(status==='updating')
      increment()
  };
  
  const getScrollContainerProps: DivFunc = (props) => {
    const ref = containerRef;
    return {
      style:{right: -scrollBarWidth,transform: `translateY(${pullTop}px)`,...animationStyle,...props?.style},
      onTouchStart: mixExec(props?.onTouchStart)(onTouchStart),
      onTouchMove: mixExec(props?.onTouchMove)(onTouchMove),
      onTouchEnd: mixExec(props?.onTouchEnd)(onTouchEnd),
      onScroll: mixExec(props?.onScroll)(onScroll),
      onSelect: mixExec(props?.onSelect)(onSelect),
      onTransitionEnd: mixExec(props?.onTransitionEnd)(onTransitionEnd),
      ref,
      ...props
    };
  };
  const getScrollBarProps: DivFunc = (props) => {
    return {
      style:{transform: `translateY(${barTop}px)`,height: barHeight,...props?.style},
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
      style:{width: scrollBarWidth,...props?.style},
      ...props
    }
  };
  
  return {
    getScrollPropsMap:{
      getScrollContainerProps,getScrollBarProps,getPullingAnimationProps,getTrackProps
    },
    status,touchTrigger:touchTriggerRef.current,updatableRate,upGlideLoaded,downGlideUpdated
  };
};

export default useScrollBarPos;