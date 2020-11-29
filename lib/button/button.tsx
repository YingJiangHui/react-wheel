import React from 'react';
import './button.scss';
import {scopedClass} from '../helper/scopedClass';

const sc = scopedClass('makabaka-button');

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: string,
  full?: boolean,
}
const Button: React.FunctionComponent<Props> = ({children,className, type, full=false, ...rest}) => {
  const classes = {
    [type||'']:Boolean(type),
    [type+'-full']:full,
  }
  return <button {...rest} className={sc(classes,{extra:['makabaka-button',className||'']}) }>{children}</button>;
};
Button.defaultProps={full:false,type:''}
export default Button;