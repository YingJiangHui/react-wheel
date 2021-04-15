import {useEffect, useRef, useState} from 'react';
import React from 'react'

type divFunc = (props?: React.HTMLAttributes<HTMLDivElement>) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const useScrollBarPos = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollBarRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const scrollBarFirstYRef = useRef(0)
  const scrollBarFirstTopRef = useRef(0)
  const [scrollBarHeight, setScrollBarHeight] = useState(0)
  const [barTop, _setBarTop] = useState(0)
  
  const setBarTop = (number: number) => {
    if (number <= 0) return;
    const {current} = containerRef
    const {scrollHeight} = current!
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollBarMaxTop = (scrollHeight - viewHeight) / scrollHeight * viewHeight
    if (number >= scrollBarMaxTop) return;
    _setBarTop(number)
  }
  
  const onMouseUpBar = () => {
    isDraggingRef.current = false
  }
  const onMouseMoveBar = (e: MouseEvent) => {
    const {current} = containerRef
    const {scrollHeight} = current!
    const viewportHeight = current!.getBoundingClientRect().height;
    if (!isDraggingRef.current) return;
    const diff = e.clientY - scrollBarFirstYRef.current
    const newScrollBarTop = diff + scrollBarFirstTopRef.current
    setBarTop(newScrollBarTop)
    current!.scrollTop = scrollHeight * newScrollBarTop / viewportHeight
  }
  
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDraggingRef.current = true
    scrollBarFirstYRef.current = e.clientY
    scrollBarFirstTopRef.current = barTop
  }
  const onSelectState = (e: Event) => {
    if (isDraggingRef.current)
      e.preventDefault()
  };
  useEffect(() => {
    const {current} = containerRef
    setScrollBarHeight(Math.pow(current!.clientHeight, 2) / current!.scrollHeight)
    setBarTop(current!.scrollTop * current!.clientHeight / current!.scrollHeight)
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
      onScroll: (e) => {
        const {currentTarget} = e
        setScrollBarHeight(Math.pow(currentTarget.clientHeight, 2) / currentTarget.scrollHeight)
        setBarTop(currentTarget.scrollTop * currentTarget.clientHeight / currentTarget.scrollHeight)
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
      ref: scrollBarRef,
      ...props
    }
  }
  return {
    getScrollProps: getScrollContainerProps,
    getScrollBarProps,
    scrollHeight: scrollBarHeight,
    scrollTop: barTop
  }
}

export default useScrollBarPos