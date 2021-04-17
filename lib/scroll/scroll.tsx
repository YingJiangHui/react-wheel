import React,{FC} from 'react'
import {scopedClass} from '../helper/scopedClass';
import './scroll.scss'
import useCalculateScrollBarWidth from './hooks/useCalculateScrollBarWidth';
import useScrollBarPos from './hooks/useScrollBarPos';

interface ScrollProps {
    onPull?:()=>void
}
const sc = scopedClass('makabaka-scroll');

const Scroll:FC<ScrollProps> = (props)=>{
    const {children}= props
    const {scrollBarWidth} = useCalculateScrollBarWidth()
    const {getScrollProps,scrollTop,scrollHeight,getScrollBarProps,pullTop} = useScrollBarPos({onPull:()=>{
        console.log('跟新')
    }})
    return (
    <div className={sc()}>
        <div className={sc("inner")} style={{right:-scrollBarWidth,transform:`translateY(${pullTop}px)`}}  {...getScrollProps()}>{children}</div>
        <div className={sc('track')} style={{width:scrollBarWidth}}>
            <div className={sc('bar')} style={{transform:`translateY(${scrollTop}px)`,height:scrollHeight}} {...getScrollBarProps()}/>
        </div>
    </div>
    )
}

export default Scroll