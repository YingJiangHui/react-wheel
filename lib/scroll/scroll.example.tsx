import React,{FC,useEffect,useRef,useState} from 'react';
import Scroll from './scroll';
import useScrollBarPos from './hooks/useScrollBarPos';

interface scrollExampleProps {

}

const request = ():Promise<{name:string,age:number}[]> => {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const a = new Array(40).fill({
        name: '小明',age: 18
      })
      resolve(a)
    },500)
  })
};
const scrollExample: FC<scrollExampleProps> = (props) => {
  const timerRef = useRef(0);
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState<{name:string,age:number}[]>([])
  useEffect(()=>{
    setLoading(true)
    request().then((data)=>{
      setData(d=>d.concat(data))
      setLoading(false)
    })
  },[])
  const {getScrollPropsMap,status} = useScrollBarPos({
    upGlideLoading: loading,updating: loading,onEvent: () => {
      return {
        onCancelUpdate: () => {
          console.log('cancel');
        },onUpdating: () => {
          setLoading(true);
          clearTimeout(timerRef.current);
          setTimeout(() => {
            // setLoading(false)
          },1000);
        },onUpGlideLoad: () => {
          
          setLoading(true)
          request().then((data)=>{
            setData(d=>d.concat(data))
            setLoading(false)
          })
        }
      };
    }
  });
  const map = {
    'updating': 'updating','updatable': 'updatable','disUpdate': 'disUpdate','completed': 'completed','none': 'none'
  };
  const node = <div>{map[status]}</div>;
  return (<>
      <button onClick={() => {
        setLoading(loading => !loading);
      }}>trigger
      </button>
      <div style={{width: 200,height: '30vh'}}>
        <Scroll getScrollPropsMap={getScrollPropsMap} whenPullingReactNode={node}>
          {data.map((d)=>(<div>姓名：{d.name}年龄：{d.age}</div>))}
          {loading?"加载中...":""}
        </Scroll>
      </div>
    </>);
};

export default scrollExample;