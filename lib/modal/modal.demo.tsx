import React,{FC} from 'react';
import Demo from '../Demo';
import ModalExample1 from './modal.example.1';


interface ModalDemoProps {

}

const ModalDemo:FC<ModalDemoProps> = ()=>{
  
  return (
    <>
      {
        <Demo title="Layout" detail="Layout 组件" description="123" code={require(`!!raw-loader!./modal.example.${1}.tsx`).default}>
          <ModalExample1 />
        </Demo>
      }
    </>
  )
}

export default ModalDemo