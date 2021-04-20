import React,{FC} from 'react';
import {scopedClass} from '../helper/scopedClass';
import './scroll.scss';
import useCalculateScrollBarWidth from './hooks/useCalculateScrollBarWidth';
import useScrollBarPos,{dropDownUpdateEvent,Status} from './hooks/useScrollBarPos';
import Button from '../button/button';

interface ScrollProps extends dropDownUpdateEvent{
  onRefresh?:()=>void
  onReadyChange?:(status:Status)=>React.ReactNode|void
  waitingDistance?: number
  isWait?: boolean
}

const sc = scopedClass('makabaka-scroll');

const Scroll: FC<ScrollProps> = (props) => {
  const {children,...rest} = props;
  const {scrollBarWidth} = useCalculateScrollBarWidth();
  const {getScrollContainerProps,barTop,barHeight,getScrollBarProps,pullTop,completed} = useScrollBarPos({...rest});
  return (<>
    <Button onClick={completed}>click</Button>
      <div className={sc()}>
        <div className={sc('pull-animation-wrapper')}>
          <div></div>
        </div>
        <div className={sc('inner')}
             style={{right: -scrollBarWidth,transform: `translateY(${pullTop}px)`}}  {...getScrollContainerProps()}>{children}</div>
        <div className={sc('track')} style={{width: scrollBarWidth}}>
          <div className={sc('bar')}
               style={{transform: `translateY(${barTop}px)`,height: barHeight}} {...getScrollBarProps()}/>
        </div>
      </div>
    </>);
};

export default Scroll;