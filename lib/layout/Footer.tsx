import React from 'react'
import {scopedClass} from '../helper/scopedClass';
const cn = scopedClass('makabaka-footer')
interface FooterProps {
  className?:string
}

const Footer:React.FC<FooterProps> = ({children,className=''})=>{
  return (
    <div className={cn('',{extra:[className]})}>{children}</div>
  )
}

export default Footer