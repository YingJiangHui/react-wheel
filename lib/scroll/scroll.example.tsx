import React,{FC} from 'react'
import Scroll from './scroll';

interface scrollExampleProps {

}

const scrollExample:FC<scrollExampleProps> = (props)=>{
    return (
    <div style={{width:200,height: "30vh"}}>
        <Scroll>
            {
                new Array(40).fill(1).map((_,index)=>(<div key={index}>{index}</div>))
            }
        </Scroll>
    </div>
    )
}

export default scrollExample