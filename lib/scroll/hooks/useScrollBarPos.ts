import {useEffect,useRef,useState} from 'react';
import React from 'react'
type divFunc = (props?:React.HTMLAttributes<HTMLDivElement>)=>React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const useScrollBarPos = ()=>{
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollBarRef = useRef<HTMLDivElement>(null)
  const isMovingRef = useRef<boolean>(false)
  const scrollBarFirstYRef = useRef(0)
  const scrollBarFirstTopRef = useRef(0)
  const [scrollBarHeight,setScrollBarHeight] = useState(0)
  const [barTop,_barTop] = useState(0)
  
  const setScrollTop = (number:number)=>{
    if(number<=0)return;
    const {current} = containerRef
    const {scrollHeight} = current!
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollBarMaxTop = (scrollHeight-viewHeight)/scrollHeight*viewHeight
    if(number>=scrollBarMaxTop)return;
    current!.scrollTop = scrollHeight*number/viewHeight
    _barTop(()=>number)
  }
  useEffect(()=>{
    const {current:containerCurrent} =containerRef
    setScrollBarHeight(Math.pow(containerCurrent!.clientHeight,2)/containerCurrent!.scrollHeight)
    setScrollTop(containerCurrent!.scrollTop*containerCurrent!.clientHeight/containerCurrent!.scrollHeight)
    document.addEventListener('mouseup',(e)=>{
      isMovingRef.current = false
    })
    document.addEventListener('mousemove',(e)=>{
      if(!isMovingRef.current)return;
      const diff = e.clientY-scrollBarFirstYRef.current
      setScrollTop(diff+scrollBarFirstTopRef.current)
    })
  },[])
  const getScrollContainerProps:divFunc=(props) =>{
    return {
      onScroll:(e)=>{
        const {currentTarget} = e
        setScrollBarHeight(Math.pow(currentTarget.clientHeight,2)/currentTarget.scrollHeight)
        setScrollTop(currentTarget.scrollTop*currentTarget.clientHeight/currentTarget.scrollHeight)
        props?.onScroll?.(e)
      },
      ref:containerRef,
      ...props
    }
  }
  const getScrollBarProps:divFunc = (props)=>{
    
    return {
      ref:scrollBarRef,
      onMouseDown:(e)=>{
        isMovingRef.current = true
        scrollBarFirstYRef.current = e.clientY
        scrollBarFirstTopRef.current = barTop
      },
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