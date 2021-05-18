import React from 'react';
import './button.scss';
import {scopedClass} from '../helper/scopedClass';

const sc = scopedClass('makabaka-button');

export interface ButtonProps extends React.PropsWithChildren<any>{
  htmlType?:React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  type?: string,
  full?: boolean,
}
const Button: React.FC<ButtonProps> = ({children,className,htmlType, type, full=false, ...rest}) => {
  const classes = {
    [type||'']:Boolean(type),
    [type+'-full']:full,
  }
  return <button type={htmlType} {...rest}  className={sc(classes,{extra:['makabaka-button',className||'']}) }>{children}</button>;
};
Button.defaultProps={full:false,type:''}
export default Button;