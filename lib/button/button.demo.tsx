import React,{FC} from 'react'
import Demo from '../Demo';
import ButtonExample from './button.example';

interface ButtonDemoProps {

}

const ButtonDemo:FC<ButtonDemoProps> = (props)=>{
    
    return (
    <Demo description="1" detail='1' title="button" code={require(`!!raw-loader!./button.example.tsx`).default}>
        <ButtonExample />
    </Demo>
    )
}

export default ButtonDemo