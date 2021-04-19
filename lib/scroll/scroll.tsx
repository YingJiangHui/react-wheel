import React,{FC} from 'react'
import {scopedClass} from '../helper/scopedClass';
import './scroll.scss'
import useCalculateScrollBarWidth from './hooks/useCalculateScrollBarWidth';
import useScrollBarPos, {Status} from './hooks/useScrollBarPos';
interface ScrollProps {
    onPull?:()=>void
    onReady?:(status:Status)=>void
}
const sc = scopedClass('makabaka-scroll');

const Scroll:FC<ScrollProps> = (props)=>{
    const {children,onReady,onPull}= props
    const {scrollBarWidth} = useCalculateScrollBarWidth()
    const {getScrollContainerProps,barTop,barHeight,getScrollBarProps,pullTop} = useScrollBarPos({onPull,onReady})
    return (
    <div className={sc()}>
        <div className={sc('pull-animation-wrapper')}>
            <div></div>
        </div>
        <div className={sc("inner")} style={{right:-scrollBarWidth,transform:`translateY(${pullTop}px)`}}  {...getScrollContainerProps()}>{children}</div>
        <div className={sc('track')} style={{width:scrollBarWidth}}>
            <div className={sc('bar')} style={{transform:`translateY(${barTop}px)`,height:barHeight}} {...getScrollBarProps()}/>
        </div>
    </div>
    )
}

export default Scroll