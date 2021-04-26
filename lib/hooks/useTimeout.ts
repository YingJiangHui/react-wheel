import {useEffect,useRef} from 'react';

const useTimeout= ()=>{
  
  const timerRef = useRef<Map<string|number,number>>(new Map())
  const setTimeout = (key:string|number,handler: TimerHandler, timeout?: number, ...args: any[]):number=>{
    clearTimeout(key)
    timerRef.current.set(key,window.setTimeout(handler,timeout,...args))
    return timerRef.current.get(key)||-1
  }
  useEffect(()=>{
    return ()=>{
      timerRef.current.forEach((value) =>{
        clearTimeout(value)
      });
    }
  },[])
  const clearTimeout = (key:string|number)=>{
    window.clearTimeout(timerRef.current.get(key))
  }
  return {setTimeout,clearTimeout}
}

export default useTimeout