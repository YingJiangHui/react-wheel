import React,{FC,useEffect,useState} from 'react';
import withDefaults from '../utils/with-defaults';

interface Props {
  visible: boolean,
  enterTime: number,
  leaveTime: number,
  clearTime: number,
  name: string
}

const defaultProps = {
  visible: false,enterTime: 60,leaveTime: 60,clearTime: 60,className: '',name: 'transition'
};

// classPrefix-enter 进入
// classPrefix-enter-active 最终的过渡效果
// classPrefix-level
// classPrefix-level-active
type CSSTransitionProps = Props&typeof defaultProps&React.AllHTMLAttributes<any>
const CSSTransition: FC<React.PropsWithChildren<CSSTransitionProps>> = ({visible,name,enterTime,leaveTime,clearTime,children,...props}) => {
  const [renderable,setRenderable] = useState(visible);
  const [className,setClassName] = useState('');
  
  useEffect(() => {
    if (visible && !renderable) setRenderable(true);
    const status = visible ? 'enter' : 'leave';
    setClassName(`${name}-${status}`);
    const time = visible ? enterTime : leaveTime;
    
    const timer = setTimeout(() => {
      setClassName(`${name}-${status} ${name}-${status}-active`);
      clearTimeout(timer);
    },time);
    // leave时隐藏，enter时这个定时器没有效果t(() => {
    //     //   if (!visible) {
    //     //     setClassName('');
    //     //     setRenderable(false);
    //     //   }
    //     //   clearTimeout(clearTimer);
    //     // },time + clearTime);
    // const clearTimer = setTimeou
    
    return () => {
      clearTimeout(timer);
    };
  },[visible,renderable]);
  if (!React.isValidElement(children) || !renderable) return null;
  
  return (React.cloneElement(children,{
    ...props,className,
    onTransitionEnd:()=>{
      if (!visible) {
        setClassName('');
        setRenderable(false);
      }
    }
  }));
};

export default withDefaults(CSSTransition,defaultProps);