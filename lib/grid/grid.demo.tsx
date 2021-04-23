import React,{FC} from 'react'
import Demo from '../Demo';
import GridExample from './grid.example';

interface GridDemoProps {

}

const GridDemo:FC<GridDemoProps> = (props)=>{
    
    return (
    <Demo code={require(`!!raw-loader!./grid.example.tsx`).default}>
      <GridExample />
    </Demo>
    )
}

export default GridDemo