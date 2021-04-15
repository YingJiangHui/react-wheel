import {useEffect,useState} from 'react';

const useCalculateScrollBarWidth = ()=>{
  const [scrollBarWidth,setScrollBarWidth] = useState(0)
  useEffect(()=>{
    const div = document.createElement('div')
    Object.assign(div.style,{
      left:'-9999px',
      top:'-9999px',
      position:'absolute',
      overflow:'scroll',
      width:'100px',
      height:'100px',
    })
    document.body.appendChild(div)
    setScrollBarWidth(div.offsetWidth-div.clientWidth)
    return ()=>{
      document.body.removeChild(div)
    }
  },[])
  return {
    scrollBarWidth
  }
}

export default useCalculateScrollBarWidth