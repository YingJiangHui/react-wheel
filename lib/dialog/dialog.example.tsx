import React, {useState} from 'react';
import Dialog from './dialog';
import Button from '../button/button';

export default ()=>{
  const [x,setX] = useState(false)
  return (
    <div>
      <Button onClick={()=>setX(()=>true)}>Dialog</Button>
      <Dialog title={'base dialog'} visible={x}>
        aaa
      </Dialog>
  </div>)
}