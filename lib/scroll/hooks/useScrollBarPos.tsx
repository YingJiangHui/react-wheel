import {SyntheticEvent,useEffect,useMemo,useRef,useState} from 'react';
import React from 'react';
import useCounter from "./useCounter";
import useCalculateScrollBarWidth from './useCalculateScrollBarWidth';

type ScrollContainer = {scrollTop?: number,viewHeight?: number,scrollHeight?: number}
type DivFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,HTMLDivElement>
export type ableStatus = 'refreshable'|'refreshing'|'completed'|'none'
export type disStatus =  'disRefresh'|'none'

export type Status = ableStatus|disStatus
export type EventName = "onRefreshable" | "onRefreshing" | "onDisRefresh"| "onCompleted"|"onEnd"
export interface GetScrollPropsMap {
  getScrollContainerProps:DivFunc,getScrollBarProps:DivFunc,getPullingAnimationProps:DivFunc,getTrackProps:DivFunc
}

export type OnEvent = ()=>{
  onRefreshable?:()=>void
  onRefreshing?:()=>void
  onDisRefresh?:()=>void
  onCompleted?:()=>void
  onEnd?:()=>void
}

interface useScrollProps {
  onEvent?:OnEvent
  waitingDistance?:number
  refreshableDistance?:number
  maxDropDownDistance?:number
  completedWaitTime?:number
}
type StatusToOtherMap<Type> = Type extends "Event" ? {[key in EventName]:()=>void}:{[key in Status]:EventName}

const lifeCycleMap:{"disRefresh":disStatus[],"refreshable":ableStatus[]} = {
  'refreshable':['refreshable','refreshing','completed','none'],
  'disRefresh':['disRefresh','none']
}
const statusToEvent:StatusToOtherMap<"EventName"> = {
  'refreshable': 'onRefreshable','refreshing': 'onRefreshing','disRefresh': 'onDisRefresh','completed': 'onCompleted','none': 'onEnd'
};
const useScrollBarPos = (props: useScrollProps) => {
  const {refreshableDistance=100,waitingDistance = 60,onEvent,maxDropDownDistance=9999,completedWaitTime=0} = props;
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
  const setPullTop = (number: number) => {
    if (number>maxDropDownDistance) number = maxDropDownDistance
    if (number < 0) number = 0;
    _setPullTop(number);
  };
  const getContainerInfo = () => {
    const {current} = containerRef;
    return {
      current,viewHeight: current!.getBoundingClientRect().height,scrollHeight: current!.scrollHeight,scrollTop: current!.scrollTop
    };
  };
  const setBarTop = (number: number) => {
    if (number <= 0) return;
    const {scrollHeight,viewHeight} = getContainerInfo();
    const scrollBarMaxTop = (scrollHeight - viewHeight) / scrollHeight * viewHeight;
    if (number >= scrollBarMaxTop) return;
    _setBarTop(number);
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
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    isDraggingRef.current = true;
    barFirstClientYRef.current = e.clientY;
    barFirstTopRef.current = barTop;
  };
  const onSelectState = (e: Event) => {
    if (isDraggingRef.current) e.preventDefault();
  };
  const calculateBarHeight = ({viewHeight = 0,scrollHeight = 0}: ScrollContainer) => {
    return Math.pow(viewHeight,2) / scrollHeight;
  };
  const calculateBarTop = ({scrollTop = 0,viewHeight = 0,scrollHeight = 0}: ScrollContainer) => {
    return scrollTop * viewHeight / scrollHeight;
  };
  const setBarPosState = ({scrollTop,viewHeight,scrollHeight}: ScrollContainer) => {
    setBarHeight(calculateBarHeight({viewHeight,scrollHeight}));
    setBarTop(calculateBarTop({scrollTop,viewHeight,scrollHeight}));
  };
  const setStatus = (status: Status) => {
    _setStatus(status);
  };
  
  const onRefreshable=()=> {
    if(!touchTriggerRef.current)
    increment()
  }
  const onDisRefresh=()=> {
    if(!touchTriggerRef.current)
    setPullTop(0)
  }
  const onRefreshing=()=> {
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
  const onEnd = ()=>{
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const {scrollTop} = getContainerInfo();
    isPullingRef.current = scrollTop === 0;
    const delta = e.targetTouches[0].clientY - touchLastClientYRef.current;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
    if (!isPullingRef.current && pullTop === 0) return;
    const newPullTop = delta + pullTop
    setPullTop(newPullTop);
    setStatus(newPullTop>=refreshableDistance?'refreshable':'disRefresh')
  };
  
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchTriggerRef.current = true
    const {scrollTop} = getContainerInfo();
    isPullingRef.current = scrollTop === 0;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
  };
  useEffect(() => {
    const onEventMap:StatusToOtherMap<"Event"> = {
       onRefreshable, onRefreshing,onDisRefresh, onCompleted,onEnd
    };
    onEventMap[statusToEvent[status]]() // 内部事件
    onEvent?.()[statusToEvent[status]]?.() // 用户事件
  },[status,touchTriggerRef.current]);
  
  useEffect(()=>{
    setStatus(lifeLine[count])
  },[lifeLine,count])
  const refreshableRate = useMemo(()=>pullTop>=refreshableDistance?100:pullTop/refreshableDistance*100,[pullTop,refreshableDistance])
  const onTouchEnd = () => {
    touchTriggerRef.current = false
    if (isPullingRef.current) {
      reset()
      if(pullTop>=refreshableDistance){
        setLifeLine(lifeCycleMap['refreshable'])
      }else{
        setLifeLine(lifeCycleMap['disRefresh'])
      }
    }
  };
  useEffect(() => {
    setBarPosState(getContainerInfo());
    document.addEventListener('mouseup',onMouseUpBar);
    document.addEventListener('mousemove',onMouseMoveBar);
    document.addEventListener('selectstart',onSelectState);
    return () => {
      document.removeEventListener('mouseup',onMouseUpBar);
      document.removeEventListener('mousemove',onMouseMoveBar);
      document.removeEventListener('selectstart',onSelectState);
      window.clearTimeout(timerRef.current)
    };
  },[]);
  
  function mixExec<MF extends Function>(fn1?: MF) {
    return function <OF extends Function>(fn2?: OF) {
      return function <E>(e: E) {
        fn2?.(e);
        fn1?.(e);
      };
    };
  }
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (pullTop !== 0) {
      e.currentTarget.scrollTop = 0;
    }
    e.preventDefault();
    setBarPosState(getContainerInfo());
  };
  const onTransitionEnd = ()=>{
    if(status==='completed'||status==="disRefresh"){
      increment()
    }
  }

  const onSelect = (e: SyntheticEvent<HTMLDivElement>) => e.preventDefault();
  const {scrollBarWidth} = useCalculateScrollBarWidth();
  const animationStyle = useMemo(()=>({transition:touchTriggerRef.current?`none 0s`:`transform 0.25s`}),[touchTriggerRef.current])
  
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
      onMouseDown: mixExec(props?.onMouseDown)(onMouseDown),
      ...props
    };
  };
  const completed = () => {
    if(status==='refreshing')
      increment()
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
    status,completed,touchTrigger:touchTriggerRef.current,refreshableRate
  };
};
export default useScrollBarPos;