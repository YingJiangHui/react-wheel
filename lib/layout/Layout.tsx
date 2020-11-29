import React from 'react'
import {scopedClass} from '../helper/scopedClass'
import './layout.scss'
interface LayoutProps{
  className?:string
}
const cn = scopedClass('makabaka-layout')
const Layout:React.FC<LayoutProps> = ({children,className=''})=>{
  return (
    <div  className={cn('',{extra:[className]})}>{children}</div>
  )
}
export default Layout