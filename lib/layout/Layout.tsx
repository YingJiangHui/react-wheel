import React, {ReactElement} from 'react';
import {scopedClass} from '../helper/scopedClass'
import './layout.scss'
import Aside from './Aside';
interface LayoutProps{
  className?:string
  children:ReactElement|Array<ReactElement>
}
const cn = scopedClass('makabaka-layout')
const Layout:React.FC<LayoutProps> = ({children,className=''})=>{
  let hasAside = false
  if((children as Array<ReactElement>).length){
    (children as Array<ReactElement>).map(node=>{
      if(Aside === node.type){
        hasAside = true
      }
    })
  }
  return (
    <div className={cn({hasAside,'':true},{extra:[className]})}>{children}</div>
  )
}
export default Layout