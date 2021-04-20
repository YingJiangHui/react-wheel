import {SyntheticEvent,useEffect,useRef,useState} from 'react';
import React from 'react';

type ScrollContainer = {scrollTop?: number,viewHeight?: number,scrollHeight?: number}
type divFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,HTMLDivElement>
export type Status = 'pulling'|'refreshable'|'refreshing'|'none'

export interface dropDownUpdateEvent {
  onFinish?: () => void
  onPulling?: () => void
  onRefreshing?: () => void
  onRefreshable?: () => void
}

interface Props extends dropDownUpdateEvent {
  onRefresh?: () => void
  onReadyChange?: (status: Status) => React.ReactNode|void
  waitingDistance?: number
  isWait?: boolean
}

const useScrollBarPos = (props: Props) => {
  const {onFinish,onPulling,onRefreshing,onRefreshable,onRefresh: _onRefresh,onReadyChange,waitingDistance = 60,isWait = false} = props;
  const [barHeight,setBarHeight] = useState(0);
  const [barTop,_setBarTop] = useState(0);
  const [pullTop,_setPullTop] = useState(0);
  const [status,_setStatus] = useState<Status>('none');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const barFirstClientYRef = useRef(0);
  const barFirstTopRef = useRef(0);
  const isPullingRef = useRef(true);
  const touchLastClientYRef = useRef(0);
  const touchTriggerRef = useRef(false)
  const setPullTop = (number: number) => {
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
    // _setStatus(s=> s==='refreshing'&&status!=='none'?s:status)
    _setStatus(status);
  };
  useEffect(() => {
    onReadyChange?.(status);
    const onMap = {
      'refreshable': onRefreshable,'refreshing': onRefreshing,'pulling': onPulling,'none': onFinish
    };
    onMap[status]?.();
  },[status]);
  useEffect(() => {
    if (pullTop >= 100) {
      setStatus('refreshable');
    } else if (pullTop===waitingDistance&&touchTriggerRef.current){
      setStatus('refreshing');
    }else if (pullTop === 0) {
      setStatus('none');
    } else if (pullTop !== 0) {
      setStatus('pulling');
    }
  },[pullTop]);
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const {scrollTop} = getContainerInfo();
    isPullingRef.current = scrollTop === 0;
    const delta = e.targetTouches[0].clientY - touchLastClientYRef.current;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
    if (!isPullingRef.current && pullTop === 0) return;
    setPullTop(delta + pullTop);
  };
  const onRefresh = () => {
    setStatus('refreshing');
    _onRefresh?.();
  };
  const closeAnimation = () => {
    containerRef.current!.style.transition = `none 0s`;
  };
  const openAnimation = () => {
    containerRef.current!.style.transition = `transform 0.25s`;
  };
  
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchTriggerRef.current = true
    const {scrollTop} = getContainerInfo();
    isPullingRef.current = scrollTop === 0;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
    closeAnimation();
  };
  
  const onTouchEnd = () => {
    openAnimation();
    touchTriggerRef.current = false
    if (isPullingRef.current) {
      if (pullTop >= 100) {
        onRefresh?.();
        if (isWait) return setPullTop(waitingDistance);
      }
      setPullTop(0);
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
  const onSelect = (e: SyntheticEvent<HTMLDivElement>) => e.preventDefault();
  const getScrollContainerProps: divFunc = (props) => {
    const ref = containerRef;
    return {
      onTouchStart: mixExec(props?.onTouchStart)(onTouchStart),
      onTouchMove: mixExec(props?.onTouchMove)(onTouchMove),
      onTouchEnd: mixExec(props?.onTouchEnd)(onTouchEnd),
      onScroll: mixExec(props?.onScroll)(onScroll),
      onSelect: mixExec(props?.onSelect)(onSelect),
      ref,
      ...props
    };
  };
  const getScrollBarProps: divFunc = (props) => {
    return {
      onMouseDown: mixExec(props?.onMouseDown)(onMouseDown),
      ...props
    };
  };
  const completed = () => {
    setPullTop(0);
  };
  return {
    getScrollContainerProps,getScrollBarProps,barHeight,barTop,pullTop,status,completed
  };
};

export default useScrollBarPos;