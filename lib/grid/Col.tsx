import React,{FC} from 'react'
import {scopedClass} from "../helper/scopedClass";

interface ColProps {
  children?: React.ReactNode
  span?: number
  offset?: number
  className?: string
}
const sc = scopedClass('makabaka-col')
const Col:FC<ColProps> = (props)=>{
  const {children,span:_span,offset:_offset,className} = props
  const span = `span-${_span}`
  const offset = `offset-${_offset}`

  return (<div className={sc({[span]:true,[offset]:true,[className||'']:Boolean(className)},{extra:['makabaka-col']})}>
    {children}
  </div>)
}

export default Col