import React,{FC,useEffect,useState} from 'react';
import withDefaults from '../utils/with-defaults';

interface Props {
  visible: boolean,
  enterTime: number,
  leaveTime: number,
  clearTime: number,
  name:string
}

const defaultProps = {
  visible: false,enterTime: 60,leaveTime: 60,clearTime: 60,className: '', name:'transition'
};

// classPrefix-enter
// classPrefix-enter-active
// classPrefix-level
// classPrefix-level-active
type CSSTransitionProps = Props&typeof defaultProps&React.AllHTMLAttributes<any>
const CSSTransition: FC<React.PropsWithChildren<CSSTransitionProps>> = ({visible,name,enterTime,leaveTime,clearTime,children}) => {
  const [renderable,setRenderable] = useState(visible);
  const [className,setClassName] = useState('')
  useEffect(() => {
    if(visible) setRenderable(true)
    const status = visible?'enter':'leave'
    setClassName(`${name}-${status}`)
    const time = visible?enterTime:leaveTime
    
    const timer = setTimeout(()=>{
      setClassName(`${name}-${status} ${name}-${status}-active`)
      clearTimeout(timer)
    },time)
    
    
    return ()=>{
      clearTimeout(timer)
    }
  },[visible,renderable]);
  if(!visible&&!renderable) return null
  return (<div className={className}>
      {children}
    </div>);
};

export default withDefaults(CSSTransition,defaultProps);