import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import Icon from '../icon/Icon';
import {scopedClass} from '../helper/scopedClass';
import './dialog.scss';
import Button from '../button/button';

interface Props {
  visible: boolean
  title?: string
  onClose?: React.MouseEventHandler
  clickMaskClose?: boolean,
  buttons?: Array<ReactElement>
}

const sc = scopedClass('makabaka-dialog');
const Dialog: React.FC<Props> = ({children, visible, title, onClose, clickMaskClose, buttons}) => {
  const onClickMask = (e: React.MouseEvent) => {
    clickMaskClose && onClose && onClose(e);
  };
  return ReactDOM.createPortal(
    <>
      {visible ?
        <>
          <div className={sc('mask')} onClick={onClickMask}/>
          <div className={sc('wrapper')}>
            <button className={sc('close')} onClick={onClose}><Icon name={'close'}/></button>
            {title && <header className={sc('header')}>{title}</header>}
            <main className={sc('body')}>{children}</main>
            {buttons && buttons.length > 0 &&
            <footer className={sc('footer')}>
              {buttons && buttons.map((button, index) =>
                React.cloneElement(button, {key: index})
              )}
            </footer>}
          </div>
        </>
        : ''}
    </>
    , document.querySelector('body') as HTMLElement);
};
Dialog.defaultProps = {
  clickMaskClose: true
};

/*modal
* 嵌入HTML元素
* */

const modal = ({content, yes, no, title,buttons,clickMaskClose=true}: { content: React.ReactNode, title?: string, buttons?: Array<ReactElement>, no?: () => void, yes?: () => void ,clickMaskClose?:boolean}) => {
  const onYes = ()=>{
    close()
    yes &&yes()
  }
  const onNo = ()=>{
    close()
    no&&no()
  }
  const close = () => {
    ReactDOM.render(React.cloneElement(component, {visible: false}), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };
  const div = document.createElement('div');
  const rootNode:HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;
  rootNode.appendChild(div);
  if(!buttons){
    buttons = [
      <Button onClick={onYes} className={sc('button')} data-test-yes="toggle" type='primary' full>yes</Button>,
      <Button onClick={onNo} className={sc('button')} data-test-no="toggle">no</Button>
    ]
  }

  const component = <Dialog clickMaskClose={clickMaskClose} visible={true} title={title} buttons={buttons} onClose={close}>{content}</Dialog>;
  ReactDOM.render(component, div);
  return close;
};
/*confirm
* 确定或取消
* */
const confirm = ({content, yes, title, no,clickMaskClose=true}: { content: string, title?: string, buttons?: Array<ReactElement>, no?: () => void, yes?: () => void ,clickMaskClose?:boolean}) => {
  const onYes = ()=>{
    close()
    yes?.()
  }
  const onNo = ()=>{
    close()
    no?.()
  }
  const buttons = [
    <Button onClick={onYes} className={sc('button')} data-test-yes="toggle" type='primary' full>yes</Button>,
    <Button onClick={onNo} className={sc('button')} data-test-no="toggle">no</Button>
  ];
  const close = modal({content, yes, title, no,buttons,clickMaskClose});
};
/*
* alert
* 只有确定按钮
* */
const alert = ({content, yes,clickMaskClose=false,title}: { content: string, title?:string,buttons?: Array<ReactElement>,yes?: () => void ,clickMaskClose?:boolean}) => {
  const onYes = () => {
    close();
    yes && yes();
  };
  const buttons = [
    <Button onClick={onYes} className={sc('button')} data-test-yes="toggle" type='primary' full>yes</Button>
  ];
  const close = modal({content,yes,buttons,title,clickMaskClose})
};
export {modal, confirm, alert};
export default Dialog;