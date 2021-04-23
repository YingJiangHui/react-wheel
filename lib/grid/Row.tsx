import React from 'react'
import {scopedClass} from "../helper/scopedClass";

interface RowProps {
  children?: React.ReactNode
}

const sc = scopedClass('makabaka-row')
const Row:React.FC = (props:RowProps)=>{
  const {children} = props
  return (<div className={sc()}>{children}</div>)
}

export default Row