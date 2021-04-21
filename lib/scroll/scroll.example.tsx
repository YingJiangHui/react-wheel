import React,{FC,useEffect} from 'react';
import Scroll from './scroll';
import useScrollBarPos from './hooks/useScrollBarPos';

interface scrollExampleProps{

}

const scrollExample:FC<scrollExampleProps> = (props)=>{
  const {getScrollPropsMap,status,completed} = useScrollBarPos({
    onEvent:()=>{
      return {
        onRefreshing:()=>{
          setTimeout(()=>{
            completed()
          },1000)
        }
      }
    }
  });
  const map = {
    'refreshing':'refreshing',
    'refreshable':'refreshable',
    'disRefresh':'disRefresh',
    'completed':'completed',
  }
  const node = <div>{map[status]}</div>
  return (
    <div style={{width:200,height: "30vh"}}>
        <Scroll getScrollPropsMap={getScrollPropsMap} whenPullingNode={node}>
            {
                new Array(40).fill(1).map((_,index)=>(<div key={index}>{index}</div>))
            }
        </Scroll>
    </div>
    )
}

export default scrollExample