import React,{FC} from 'react'
import Demo from '../Demo';
import LineExample from './line.example';

interface LineDemoProps {

}

const LineDemo:FC<LineDemoProps> = (props)=>{
    
    return (
    <Demo code={require(`!!raw-loader!./line.example.tsx`).default} description="设置灰度等级" detail="Line 组件" title="Line">
      <LineExample />
    </Demo>
    )
}

export default LineDemo