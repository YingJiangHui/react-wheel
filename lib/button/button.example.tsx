import React from 'react'
import Button from './button';
const ButtonExample:React.FC=()=>{
  return (<div>
    <Button onClick={()=>{console.log(1)}} type='primary'>按钮</Button>
    <Button onClick={()=>{console.log(1)}} full type='primary'>按钮</Button>
  </div>)
}
export default ButtonExample