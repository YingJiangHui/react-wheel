import React,{CSSProperties} from 'react';
import {scopedClass} from '../helper/scopedClass';
const cn = scopedClass('makabaka-aside')
interface AsideProps {
 className?:string
 style?: CSSProperties;
}
 const Aside:React.FC<AsideProps> = ({children,className='',style})=>{
  return (
    <div style={style} className={cn('',{extra:[className]})}>{children}</div>
  )
}
export default Aside