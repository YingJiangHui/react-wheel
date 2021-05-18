import React,{FC,useContext} from 'react';
import CSSTransition from '../shared/CSSTransition';
import {ModalContext} from './useModalService';

interface Props {

}

type modalWrapperProps = Props
const ModalWrapper: FC<React.PropsWithChildren<modalWrapperProps>> = ({children}) => {
  const {visible} = useContext(ModalContext);
  return (<CSSTransition name='modal-wrapper' visible={visible}>
    <div className='modal-wrapper'>
      {children}
      <style jsx>{`
        .modal-wrapper {
          padding: 22px;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          background-color: #fff;
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s,
          transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
        }
        
        .modal-wrapper-enter {
          transform: translate(0, -30px);
          opacity: 0;
        }
        
        .modal-wrapper-enter-active {
          transform: translate(0, 0);
          opacity: 1;
        }
        
        .modal-wrapper-leave-active {
          transform: translate(0, 0);
          opacity: 1;
        }
        
        .modal-wrapper-leave-active {
          transform: translate(0, -30px);
          opacity: 0;
        }
      `}</style>
    </div>
  </CSSTransition>);
};

export default ModalWrapper;