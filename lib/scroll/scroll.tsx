import React,{FC,useEffect,useMemo} from 'react';
import {scopedClass} from '../helper/scopedClass';
import './scroll.scss';
import useCalculateScrollBarWidth from './hooks/useCalculateScrollBarWidth';
import useScrollBarPos,{dropDownUpdateEvent,Status} from './hooks/useScrollBarPos';
import Button from '../button/button';

interface ScrollProps extends dropDownUpdateEvent{
  onRefresh?:()=>void
  onReadyChange?: ({status: Status}:{status: Status}) => React.ReactNode
  waitingDistance?: number
  isWait?: boolean
  refreshableDistance?:number
  onPulling?:({refreshableRate,pullTop}:{refreshableRate:number,pullTop:number})=>void
}

const sc = scopedClass('makabaka-scroll');

const Scroll: FC<ScrollProps> = (props) => {
  const {children,onPulling,...rest} = props;
  const {scrollBarWidth} = useCalculateScrollBarWidth();
  const {getScrollContainerProps,barTop,barHeight,getScrollBarProps,pullTop,completed,whenPullingNode,touchTrigger,refreshableRate} = useScrollBarPos({...rest});
  const animationStyle = useMemo(()=>({transition:touchTrigger?`none 0s`:`transform 0.25s`}),[touchTrigger])
  useEffect(()=>{
    onPulling?.({refreshableRate,pullTop})
  },[pullTop])
  return (<>
    <Button onClick={completed}>click</Button>
      <div className={sc()}>
        <div className={sc('pull-animation-wrapper')} style={{transform:`translateY(${pullTop-30}px)`,...animationStyle}}>
          {whenPullingNode}
        </div>
        <div className={sc('inner')}
             style={{right: -scrollBarWidth,transform: `translateY(${pullTop}px)`,...animationStyle}}  {...getScrollContainerProps()}>
          {children}
        </div>
        <div className={sc('track')} style={{width: scrollBarWidth}}>
          <div className={sc('bar')}
               style={{transform: `translateY(${barTop}px)`,height: barHeight}} {...getScrollBarProps()}/>
        </div>
      </div>
    </>);
};

export default Scroll;