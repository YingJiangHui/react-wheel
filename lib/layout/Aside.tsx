import React from 'react'
import {scopedClass} from '../helper/scopedClass';
const cn = scopedClass('makabaka-aside')
interface AsideProps {
 className?:string
}
 const Aside:React.FC<AsideProps> = ({children,className=''})=>{
  return (
    <div className={cn('',{extra:[className]})}>{children}</div>
  )
}
export default Aside