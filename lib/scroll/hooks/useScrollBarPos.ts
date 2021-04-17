import {useEffect, useRef, useState} from 'react';
import React from 'react'

type ScrollContainer = { scrollTop?: number, viewHeight?: number, scrollHeight?: number }
type divFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
interface Props{
  onPull?:()=>void
}
const useScrollBarPos = (props:Props) => {
  const {onPull} = props
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const barFirstYRef = useRef(0)
  const barFirstTopRef = useRef(0)
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, _setBarTop] = useState(0)
  const [pullTop,_setPullTop] = useState(0)
  const isPullRef = useRef(true)
  const touchLastYRef = useRef(0)
  const setPullTop = (number:number)=>{
    if(number>100)number = 100
    if(number<0)number = 0
    _setPullTop(number)
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
    const diff = e.clientY - barFirstYRef.current
    const newScrollBarTop = diff + barFirstTopRef.current
    setBarTop(newScrollBarTop)
    current!.scrollTop = scrollHeight * newScrollBarTop / viewHeight
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDraggingRef.current = true
    barFirstYRef.current = e.clientY
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
  const onTouchMove = (e:React.TouchEvent<HTMLDivElement>)=>{
    const {scrollTop} = getContainerInfo()
    isPullRef.current = scrollTop===0
    console.log("isPullRef,pullTop")
    console.log(isPullRef,pullTop)
    const delta = e.targetTouches[0].clientY - touchLastYRef.current
    touchLastYRef.current = e.targetTouches[0].clientY
    if(!isPullRef.current&&pullTop===0) return
    setPullTop(delta+pullTop)
  };
  const onTouchEnd = ()=>{
    if(isPullRef.current){
      if(pullTop===100) onPull?.()
      setPullTop(0)
    }
  };
  
  const onTouchStart = (e:React.TouchEvent<HTMLDivElement>)=>{
    const {scrollTop} = getContainerInfo()
    isPullRef.current = scrollTop===0
    touchLastYRef.current = e.targetTouches[0].clientY
  }
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
    getScrollProps: getScrollContainerProps,
    getScrollBarProps,
    scrollHeight: barHeight,
    scrollTop: barTop,
    pullTop,
  }
}

export default useScrollBarPos