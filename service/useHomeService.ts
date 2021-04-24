import {useEffect, useMemo, useState} from 'react';

const useHomeService = ()=>{
  useEffect(()=>{
    console.log(window.innerWidth, window.outerWidth);
  },[window.innerWidth])
  const canVisible = useMemo(()=>window.innerWidth<500,[])
  const [asideVisible,setAsideVisible] = useState<null|boolean>(null)
  const onClickSideBar = ()=>{
    setAsideVisible(visible=>!visible)
  }
  const asideStyleTransform = useMemo(()=>{
    if(asideVisible===null) return {}
    return canVisible?{animation:asideVisible?"moveIn 0.25s forwards":"moveOut 0.25s forwards"}:{}},[asideVisible])
  return {setAsideVisible,asideVisible,onClickSideBar,asideStyleTransform}
}

export default useHomeService