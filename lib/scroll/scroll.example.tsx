import React,{FC,useRef} from 'react';
import Scroll from './scroll';
import useScrollBarPos from './hooks/useScrollBarPos';

interface scrollExampleProps{

}

const scrollExample:FC<scrollExampleProps> = (props)=>{
  const timerRef = useRef(0)
  const {getScrollPropsMap,status,upGlideLoaded} = useScrollBarPos({
    onEvent:()=>{
      return {
        onUpGlideLoad:()=>{
          clearTimeout(timerRef.current)
          setTimeout(()=>{
            upGlideLoaded()
          },1000)
          console.log("load")
        }
      }
    }
  });
  const map = {
    'updating':'updating',
    'updatable':'updatable',
    'disUpdate':'disUpdate',
    'completed':'completed',
    'none':'none'
  }
  const node = <div>{map[status]}</div>
  return (
    <div style={{width:200,height: "30vh"}}>
        <Scroll getScrollPropsMap={getScrollPropsMap} whenPullingReactNode={node}>
            {
                new Array(40).fill(1).map((_,index)=>(<div key={index}>{index}</div>))
            }
        </Scroll>
    </div>
    )
}

export default scrollExample