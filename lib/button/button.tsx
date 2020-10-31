import React from 'react'
import './button.scss'
import {scopedClass} from '../helper/scopedClass';
import classes from '../helper/classes';


const sc = scopedClass
const x = sc('x-button')
interface Props {
  type?:string
}
const Button:React.FunctionComponent<Props> =({children,type})=>{
  return <button className={classes(x(),x(type))}>{children}</button>
}
export default Button