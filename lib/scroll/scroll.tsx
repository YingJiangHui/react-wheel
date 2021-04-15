import React,{FC} from 'react'
import {scopedClass} from '../helper/scopedClass';
import './scroll.scss'
import useCalculateScrollBarWidth from './hooks/useCalculateScrollBarWidth';

interface ScrollProps {
    onPull?:()=>void
}
const sc = scopedClass('makabaka-scroll');

const Scroll:FC<ScrollProps> = (props)=>{
    const {children}= props
    const {scrollBarWidth} = useCalculateScrollBarWidth()
    return (
    <div className={sc()}>
        <div className={sc("inner")} style={{right:-scrollBarWidth}}>{children}</div>
    </div>
    )
}

export default Scroll