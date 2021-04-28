import React,{FC,useEffect,useState} from 'react';
import withDefaults from '../utils/with-defaults';

interface Props {
  visible?: boolean,
  enterTime?: number,
  leaveTime?: number,
  clearTime?: number,
  name?: string
}

const defaultProps = {
  visible: false,enterTime: 60,leaveTime: 60,clearTime: 0,className: '',name: 'transition'
};

// .classPrefix-enter 进入
// .classPrefix-enter-active 最终的过渡效果
// .classPrefix-level
// .classPrefix-level-active
type CSSTransitionProps = Props&typeof defaultProps&React.AllHTMLAttributes<any>
const CSSTransition: FC<React.PropsWithChildren<CSSTransitionProps>> = ({visible,name,enterTime,leaveTime,clearTime,children,className,...props}) => {
  const [renderable,setRenderable] = useState(visible);
  const [classes,setClasses] = useState('');
  
  useEffect(() => {
    if (visible && !renderable) setRenderable(true);
    const status = visible ? 'enter' : 'leave';
    const time = visible ? enterTime : leaveTime;
    setClasses(`${name}-${status}`);
    
    const timer = setTimeout(() => {
      setClasses(`${name}-${status} ${name}-${status}-active`);
      clearTimeout(timer);
    },time);
    // leave时隐藏，enter时这个定时器没有效果
    const clearTimer = setTimeout(() => {
      // 设置了clearTime执行
      if (!visible && clearTime) {
        setClasses('');
        setRenderable(false);
      }
      clearTimeout(clearTimer);
    },time + clearTime);
    
    return () => {
      clearTimeout(clearTimer);
      clearTimeout(timer);
    };
  },[visible,renderable]);
  if (!React.isValidElement(children) || !renderable) return null;
  return React.cloneElement(children,{
    ...props,className: `${className} ${children.props.className} ${classes}`,onTransitionEnd: (e:TransitionEvent) => {
      children.props.onTransitionEnd(e);
      // 没设置clearTime时执行
      if (!visible && !clearTime) {
        setClasses('');
        setRenderable(false);
      }
    }
  });
};

export default withDefaults(CSSTransition,defaultProps);