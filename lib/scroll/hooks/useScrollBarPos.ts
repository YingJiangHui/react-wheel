import {useEffect,useRef,useState} from 'react';
import React from 'react'

const useScrollBarPos = ()=>{
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollHeight,setScrollHeight] = useState(0)
  const [scrollTop,setScrollTop] = useState(0)
  useEffect(()=>{
    const {current} =containerRef
    setScrollHeight(Math.pow(current!.clientHeight,2)/current!.scrollHeight)
    setScrollTop(current!.scrollTop*current!.clientHeight/current!.scrollHeight)
  },[])
  const getScrollProps=(props?:React.HTMLAttributes<HTMLDivElement>): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> =>{
    return {
      onScroll:(e)=>{
        const {currentTarget} = e
        setScrollHeight(Math.pow(currentTarget.clientHeight,2)/currentTarget.scrollHeight)
        setScrollTop(currentTarget.scrollTop*currentTarget.clientHeight/currentTarget.scrollHeight)
        props?.onScroll?.(e)
      },
      ref:containerRef
    }
  }
  return {
    getScrollProps,
    scrollHeight,
    scrollTop
  }
}

export default useScrollBarPos