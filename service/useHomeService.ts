import {useMemo,useState} from 'react';

const useHomeService = ()=>{
  const [asideVisible,setAsideVisible] = useState(false)
  const onClickSideBar = ()=>{
    setAsideVisible(visible=>!visible)
  }
  const asideStyleTransform = useMemo(()=>(asideVisible?{transform:'translateX(0)'}:{}),[asideVisible])
  return {setAsideVisible,asideVisible,onClickSideBar,asideStyleTransform}
}

export default useHomeService