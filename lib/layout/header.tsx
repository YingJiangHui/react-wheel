import React  from 'react';
import './header.scss'
interface Props {
}
const Header:React.FC<Props> = ({children})=>{
  return (<div className={'x-header'}>{children}</div>)
}
export default Header