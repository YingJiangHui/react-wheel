import React from 'react';
import {confirm, modal, alert} from './dialog';
import Button from '../button/button';

export default () => {
  const onModal = () => {
    const close = modal({
      content: (<Button onClick={() => close()}>close</Button>),
      title: 'modal',
      yes: () => {console.log('yes');}
    });
  };

  const onAlert = () => {
    alert({
      content: ('alert'),
      title: 'modal',
      yes: () => {console.log('yes');}
    });
  };

  const onConfirm = () => {
     confirm({
      content:'confirm',
      title: 'modal',
      yes: () => {console.log('yes');}
    });
  };
  return (<div>
    <Button onClick={onModal} type={'primary'} full>modal</Button>
    <Button onClick={onAlert} >alert</Button>
    <Button onClick={onConfirm}>confirm</Button>
  </div>)
}