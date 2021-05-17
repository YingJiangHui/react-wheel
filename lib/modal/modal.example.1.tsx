import React,{FC,useState} from 'react';
import {Modal} from './index';
import Button from '../button/button';

interface ModalExample1Props {

}

const ModalExample1:FC<ModalExample1Props> = ()=>{
    const [visible,setVisible] = useState(false)
    return (
      <>
        <Button onClick={()=>{setVisible(true)}}>visible</Button>
          <Modal visible={visible} onClose={()=>{setVisible(false)}}>
            <Modal.Title>title</Modal.Title>
            <Modal.Content>content</Modal.Content>
            <Modal.Actions>
              <Modal.Action>no</Modal.Action>
              <Modal.Action>yes</Modal.Action>
            </Modal.Actions>
          </Modal>
      </>
    )
}

export default ModalExample1