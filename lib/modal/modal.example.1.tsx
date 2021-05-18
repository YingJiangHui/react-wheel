import React,{FC,useState} from 'react';
import {Modal} from './index';
import Button from '../button/button';

interface ModalExample1Props {

}

const ModalExample1:FC<ModalExample1Props> = ()=>{
    const [visible,setVisible] = useState(false)
  const [confirmLoading,setConfirmLoading] = useState(false)
    return (
      <>
        <Button onClick={()=>{setVisible(true)}}>visible</Button>
          <Modal visible={visible} onClose={()=>{setVisible(false);setConfirmLoading(true);setTimeout(()=>{setConfirmLoading(false)},1000)}} confirmLoading={confirmLoading}>
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.SubTitle>sub title</Modal.SubTitle>
            <Modal.Content>content</Modal.Content>
            <Modal.Actions>
              <Modal.Action>Cancel</Modal.Action>
              <Modal.Action htmlType="submit">Submit</Modal.Action>
            </Modal.Actions>
          </Modal>
      </>
    )
}

export default ModalExample1