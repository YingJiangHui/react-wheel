import React from 'react';
import './button.scss';
import {scopedClass} from '../helper/scopedClass';
import classes from '../helper/classes';

const cs = classes;

const sc = scopedClass;
const x = sc('x-button');

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: string,
  full?: boolean,
}
const Button: React.FunctionComponent<Props> = ({children,className, type, full=false, ...rest}) => {
  const isType = Boolean(type)
  const classes: { [key: string]: boolean } = {
    [x()]:true,
    [x(type)]:Boolean(x),
    [x(type + '-full')]:isType&&full,
    [className||'']:Boolean(className)
  };
  return <button {...rest} className={cs(classes,className)}>{children}</button>;
};
Button.defaultProps={full:false,type:''}
export default Button;