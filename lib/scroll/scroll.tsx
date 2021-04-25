import React,{FC} from 'react';
import {scopedClass} from '../helper/scopedClass';
import './scroll.scss';
import {GetScrollPropsMap} from './hooks/useScroll';

interface ScrollProps{
  whenPullingReactNode?:React.ReactNode
  getScrollPropsMap:GetScrollPropsMap
}

const sc = scopedClass('makabaka-scroll');

const Scroll: FC<ScrollProps> = (props) => {
  const {children,whenPullingReactNode,getScrollPropsMap} = props;
  const {getPullingAnimationProps,getScrollContainerProps,getTrackProps,getScrollBarProps} = getScrollPropsMap
  return (<>
      <div className={sc()}>
        <div className={sc('pull-animation-wrapper')} {...getPullingAnimationProps()}>
          {whenPullingReactNode}
        </div>
        <div className={sc('inner')} {...getScrollContainerProps()}>
          {children}
        </div>
        <div className={sc('track')} {...getTrackProps()}>
          <div className={sc('bar')} {...getScrollBarProps()}/>
        </div>
      </div>
    </>);
};

export default Scroll;