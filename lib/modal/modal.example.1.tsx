import React,{FC,useState} from 'react';
import Modal from './modal';
import Button from '../button/button';

interface ModalExample1Props {

}

const ModalExample1:FC<ModalExample1Props> = ()=>{
    const [visible,setVisible] = useState(false)
    return (
      <>
        <Button onClick={()=>{setVisible(true)}}>visible</Button>
          <Modal visible={visible} onClose={()=>{setVisible(false)}}>2222222222222222222222</Modal>
      </>
    )
}

export default ModalExample1