import {useEffect, useRef, useState} from 'react';
import React from 'react'

type ScrollContainer = { scrollTop?: number, viewHeight?: number, scrollHeight?: number }
type divFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export type Status = 'pulling'|'refreshable'|'refreshing'|'none'
interface Props{
  onPull?:()=>void
  onReady?:(status:Status)=>void
  distance: number
}

const useScrollBarPos = (props:Props) => {
  const {onPull:_onPull,onReady,distance} = props
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, _setBarTop] = useState(0)
  const [pullTop,_setPullTop] = useState(0)
  const [status,_setStatus] = useState<Status>('none')
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const barFirstClientYRef = useRef(0)
  const barFirstTopRef = useRef(0)
  const isPullingRef = useRef(true)
  const touchLastClientYRef = useRef(0)
 
  const setPullTop = (number:number)=>{
    // if(number>100)number = 100
    if(number<0)number = 0
    _setPullTop(number)
  }
  const completed = ()=>{
    setPullTop(0)
  }
  const getContainerInfo = () => {
    const {current} = containerRef
    return {
      current,
      viewHeight: current!.getBoundingClientRect().height,
      scrollHeight: current!.scrollHeight,
      scrollTop: current!.scrollTop
    }
  }
  const setBarTop = (number: number) => {
    if (number <= 0) return;
    const {scrollHeight,viewHeight} = getContainerInfo()
    const scrollBarMaxTop = (scrollHeight - viewHeight) / scrollHeight * viewHeight
    if (number >= scrollBarMaxTop) return;
    _setBarTop(number)
  }
  const onMouseUpBar = () => {
    isDraggingRef.current = false
  }
  const onMouseMoveBar = (e: MouseEvent) => {
    const {scrollHeight,viewHeight,current} = getContainerInfo()
    if (!isDraggingRef.current) return;
    const delta = e.clientY - barFirstClientYRef.current
    const newScrollBarTop = delta + barFirstTopRef.current
    setBarTop(newScrollBarTop)
    current!.scrollTop = scrollHeight * newScrollBarTop / viewHeight
  }
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDraggingRef.current = true
    barFirstClientYRef.current = e.clientY
    barFirstTopRef.current = barTop
  }
  const onSelectState = (e: Event) => {
    if (isDraggingRef.current)
      e.preventDefault()
  };
  const calculateBarHeight = ({viewHeight = 0, scrollHeight = 0}: ScrollContainer) => {
    return Math.pow(viewHeight, 2) / scrollHeight
  }
  const calculateBarTop = ({scrollTop = 0, viewHeight = 0, scrollHeight = 0}: ScrollContainer) => {
    return scrollTop * viewHeight / scrollHeight
  }
  const setBarPosState = ({scrollTop, viewHeight, scrollHeight}: ScrollContainer) => {
    setBarHeight(calculateBarHeight({viewHeight, scrollHeight}))
    setBarTop(calculateBarTop({scrollTop, viewHeight, scrollHeight}))
  }
  const setStatus = (status:Status)=>{
    _setStatus(s=> s==='refreshing'&&status!=='none'?s:status)
  }
  useEffect(()=>{
    onReady?.(status)
  },[status])
  useEffect(()=>{
    if(pullTop>100){
      setStatus('refreshable')
    }else if(pullTop===distance){
      setStatus('refreshing')
    }else if(pullTop===0){
      setStatus('none')
    }else if(pullTop!==0){
      setStatus('pulling')
    }
  },[pullTop])
  const onTouchMove = (e:React.TouchEvent<HTMLDivElement>)=>{
    const {scrollTop} = getContainerInfo()
    isPullingRef.current = scrollTop===0
    const delta = e.targetTouches[0].clientY - touchLastClientYRef.current
    touchLastClientYRef.current = e.targetTouches[0].clientY
    if(!isPullingRef.current&&pullTop===0) return
    setPullTop(delta+pullTop)
  };
  const onPull = ()=>{
    setStatus('refreshing')
    _onPull?.()
  }
  const closeAnimation = ()=>{
    containerRef.current!.style.transition = `none 0s`
  }
  const openAnimation = ()=>{
    containerRef.current!.style.transition = `transform 0.25s`
  }
  
  const onTouchStart = (e:React.TouchEvent<HTMLDivElement>)=>{
    const {scrollTop} = getContainerInfo()
    isPullingRef.current = scrollTop===0
    touchLastClientYRef.current = e.targetTouches[0].clientY
    closeAnimation()
  }

  const onTouchEnd = ()=>{
    openAnimation()
    if(isPullingRef.current){
      if(pullTop>=100) {
        onPull?.();
        setPullTop(60)
      }else{
        setPullTop(0)
      }
    }
  };
  useEffect(() => {
    setBarPosState(getContainerInfo())
    document.addEventListener('mouseup', onMouseUpBar)
    document.addEventListener('mousemove', onMouseMoveBar)
    document.addEventListener('selectstart', onSelectState)
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar)
      document.removeEventListener('mousemove', onMouseMoveBar)
      document.removeEventListener('selectstart', onSelectState)
    }
  }, [])
  
  const getScrollContainerProps: divFunc = (props) => {
    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onScroll: (e) => {
        if(pullTop!==0){
          e.currentTarget.scrollTop = 0
        }
        e.preventDefault()
        setBarPosState(getContainerInfo())
        props?.onScroll?.(e)
      },
      onSelect: (e) => {
        e.preventDefault()
      },
      ref: containerRef,
      ...props
    }
  }
  const getScrollBarProps: divFunc = (props) => {
    return {
      onMouseDown,
      ...props
    }
  }
  return {
    getScrollContainerProps,
    getScrollBarProps,
    barHeight,
    barTop,
    pullTop,
    status,
    completed
  }
}

export default useScrollBarPos