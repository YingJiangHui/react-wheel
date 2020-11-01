import React from 'react';
import Icon from '../icon/Icon';
import Button from '../button/button';
import {scopedClass} from '../helper/scopedClass';
import classes from '../helper/classes';
import './dialog.scss'
interface Props {
  visible: boolean
  title:string
}
const x = scopedClass('x-dialog')
const Dialog: React.FC<Props> = ({children, visible,title}) => {

  return (
    <>
      {visible ?
        <>
          <div className={x('mask')}/>
          <div className={x('wrapper')}>
            <button className={x('close')}><Icon name={'close'}/></button>
            <header className={x('header')}>{title}</header>
            <body className={x('body')}>{children}</body>
            <footer className={x('footer')}>
              <Button className={classes(x('button'),x('button-cancel'))}>取消</Button>
              <Button className={classes(x('button'),x('button-ok'))} type={'primary'} full={true}>确认</Button>
            </footer>
          </div>
        </>

        : ''}
    </>
  );
};
export default Dialog;