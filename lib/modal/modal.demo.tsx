import React,{FC} from 'react';
import Demo from '../Demo';
import ModalExample1 from './modal.example.1';


interface ModalDemoProps {

}

const ModalDemo:FC<ModalDemoProps> = ()=>{
  
  return (
    <Demo description="1" detail='1' title="Modal" code={require(`!!raw-loader!./modal.example.1.tsx`).default}>
      <ModalExample1 />
    </Demo>
  )
}

export default ModalDemo