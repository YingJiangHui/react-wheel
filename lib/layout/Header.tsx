import React from 'react'
import {scopedClass} from '../helper/scopedClass';
const cn = scopedClass('makabaka-header')
interface HeaderProps {
  className?:string
}

const Header:React.FC<HeaderProps> = ({children,className=''})=>{
  return (
    <div className={cn('',{extra:[className]})}> {children}</div>
  )
}

export default Header