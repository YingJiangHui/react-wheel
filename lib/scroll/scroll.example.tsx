import React,{FC} from 'react'
import Scroll from './scroll';

interface scrollExampleProps{

}

const scrollExample:FC<scrollExampleProps> = (props)=>{
    return (
    <div style={{width:200,height: "30vh"}}>
        <Scroll onReadyChange={(status)=>{
            const nodeMap = {
                'refreshing':1,
                'disRefresh':2,
                'refreshable':3,
                'completed':4,
                'none':5
            }
            return nodeMap[status]
        }} onCompleted={()=>{console.log('onFinish')}} isWait={true} onRefresh={()=>{console.log(1);}}>
            {
                new Array(40).fill(1).map((_,index)=>(<div key={index}>{index}</div>))
            }
        </Scroll>
    </div>
    )
}

export default scrollExample