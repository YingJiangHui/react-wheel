import {useCallback, useState} from "react";

const useCounter = ()=>{
  const [count,setCount] = useState<number>(0)
  const reset = useCallback(()=>{
    setCount(0)
  },[]);
  const increment = useCallback(()=>{
    setCount(count =>count+1 )
  },[]);
  return {
    increment,
    count,
    reset
  }
}

export default useCounter