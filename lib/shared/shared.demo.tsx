import React,{FC,useState} from 'react';
import CSSTransition from './CSSTransition';
import {Modal} from '../modal';
interface SharedDemoProps {

}

const SharedDemo: FC<SharedDemoProps> = (props) => {
  const [visible,setVisible] = useState(false);
  return <div>
    <Modal visible={visible}>123123</Modal>
    <button onClick={() => setVisible(v => !v)}>click</button>
    <CSSTransition clearTime={5000} visible={visible} name="box">
      <div className="box">
      <style jsx>{`
        .box {
          height: 100px;
          width: 100px;
          background: black;
          position: absolute;
          left: 50%;
          top: 50%;
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s,
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
        }
        
        .box-enter {
           transform: translate3d(0px, -30px, 0px);
          opacity: 0;
        }
        
        .box-enter-active {
         transform: translate3d(0px, 0px, 0px);
          opacity: 1;
        }
        
        .box-leave {
          transform: translate3d(0px, 0px, 0px);
          opacity: 1;
        }
        
        .box-leave-active {
          transform: translate3d(0px, -30px, 0px);

          opacity: 0;
        }
      `}
      </style>
      </div>
    </CSSTransition>
  </div>;
};

export default SharedDemo;