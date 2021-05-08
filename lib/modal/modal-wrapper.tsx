import React,{FC,useContext} from 'react';
import CSSTransition from '../shared/CSSTransition';
import {ModalContext} from './useModalService';

interface Props {

}
type modalWrapperProps = Props
const ModalWrapper: FC<React.PropsWithChildren<modalWrapperProps>> = ({children}) => {
  const {visible,getOriginTransition} = useContext(ModalContext)
  console.log(getOriginTransition())
  return (<CSSTransition name='modal-wrapper' visible={visible}>
    <div className='modal-wrapper'>
      {children}
      <style jsx>{`
        .modal-wrapper {
          background-color: #fff;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0s,
          transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
          transform-origin: ${getOriginTransition().map((pos)=>pos+'px').join(" ")};
        }
        
        .modal-wrapper-enter {
          opacity: 0;
          transform: scale(0);
        }
        
        .modal-wrapper-enter-active {
          opacity: 1;
          transform: scale(1);
          
        }
        
        .modal-wrapper-leave-active {
          opacity: 1;
          transform: scale(1);
          
        }
        
        .modal-wrapper-leave-active {
          opacity: 0;
          transform: scale(0);
        }
      `}</style>
    </div>
  </CSSTransition>);
};

export default ModalWrapper;