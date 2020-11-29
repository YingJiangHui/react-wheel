import React from 'react'
import {scopedClass} from '../helper/scopedClass';
const cn = scopedClass('makabaka-content')
interface ContentProps {
  className?:string
}
const Content:React.FC<ContentProps> = ({children,className=''})=>{
  return (
    <div className={cn('',{extra:[className]})}>{children}</div>
  )
}
export default Content