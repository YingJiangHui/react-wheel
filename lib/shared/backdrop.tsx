import React,{FC,HTMLAttributes,useRef} from 'react';
import CSSTransition from './CSSTransition';
import withDefaults from '../utils/with-defaults';

interface Props {
  width?: string,
  visible?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
}

const defaultProps = {
  width: '520px',visible: false,onClick: () => {}
};
type BackdropProps = Props&typeof defaultProps&HTMLAttributes<any>

const Backdrop: FC<React.PropsWithChildren<BackdropProps>> = ({width,visible,onClick}) => {
  const isContentMouseDownRef = useRef<boolean>(false);
  const clickHandle = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    if (isContentMouseDownRef.current) return;
    onClick(e);
  };
  const childrenClickHandle = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    e.stopPropagation();
  };
  const childrenMouseDownHandle = () => {
    isContentMouseDownRef.current = true;
  };
  const mouseUpHandle = () => {
    if(!isContentMouseDownRef.current) return
    const timer = setTimeout(() => {
      isContentMouseDownRef.current = false;
      clearTimeout(timer);
    },0);
  };
  return (<CSSTransition name="backdrop" visible={visible}>
    <div className='makabaka-backdrop' onClick={clickHandle} onMouseUp={mouseUpHandle}>
      <div className='layer'/>
      <div className='content' onMouseDown={childrenMouseDownHandle} onClick={childrenClickHandle}/>
      <style jsx>{`
        .makabaka-backdrop {
          z-index: 1000;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          height: 100%;
          width: 100%;
          overflow: auto;
          text-align: center;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
        }
        
        .layer {
          position: fixed;
          left: 0;
          top: 0;
          background-color: black;
          height: 100%;
          width: 100%;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0s;
        }
        
        .content {
          display: inline-block;
          position: relative;
          height: 100px;
          z-index: 1001;
          vertical-align: middle;
          width: ${width};
          margin: 20px auto;
          max-width: 520px;
        }
        
        .makabaka-backdrop:before {
          display: inline-block;
          width: 0;
          height: 100%;
          vertical-align: middle;
          content: '';
        }
        
        .backdrop-enter .layer {
          opacity: 0;
        }
        
        .backdrop-enter-active .layer {
          opacity: 0.3;
        }
        
        .backdrop-leave .layer {
          opacity: 0.3;
        }
        
        .backdrop-leave-active .layer {
          opacity: 0;
        }
      `}</style>
    </div>
  </CSSTransition>);
};

export default withDefaults(Backdrop,defaultProps);