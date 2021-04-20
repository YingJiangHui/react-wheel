import React,{FC} from 'react'
import Scroll from './scroll';

interface scrollExampleProps{

}

const scrollExample:FC<scrollExampleProps> = (props)=>{
    return (
    <div style={{width:200,height: "30vh"}}>
        <Scroll onReadyChange={(status)=>{
            const nodeMap = {
                'refreshing':<>123</>,
                'pulling':<>723423</>,
                'refreshable':"sdfff",
                'none':1
            }
            return nodeMap[status]
        }} onFinish={()=>{console.log('onFinish')}} isWait={true} onRefresh={()=>{console.log(1);}}>
            {
                new Array(40).fill(1).map((_,index)=>(<div key={index}>{index}</div>))
            }
        </Scroll>
    </div>
    )
}

export default scrollExample