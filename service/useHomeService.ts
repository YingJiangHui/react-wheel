import {useEffect, useState} from 'react';

const useHomeService = ()=>{
  const [asideVisible,setAsideVisible] = useState<boolean>(false)
  const [windowInnerWidth,setWindowInnerWidth] = useState(0)
  useEffect(()=>{
    setWindowInnerWidth(window.innerWidth)
    window.onresize = ()=>{
      setWindowInnerWidth(window.innerWidth)
    }
    return ()=>{
      window.onresize = null
    }
  },[])
  const onClickSideBar = ()=>{
    setAsideVisible(visible=>!visible)
  }
  return {onClickSideBar,asideVisible,windowInnerWidth}
}

export default useHomeService