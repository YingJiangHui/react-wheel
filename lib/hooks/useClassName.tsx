import {useState} from 'react';

interface UseClassesProps{
  prefix?: string
  extraClassName?: (string|number)[]
}


const useClassName = (props:UseClassesProps={})=>{
  const {prefix,extraClassName=[]} = props
  const [classNames,_setClassNames] = useState<string>('')
  function setClassNames(arg1:{[key in number|string]:boolean}):void
  function setClassNames(arg1:string,...args:string[]):void
  function setClassNames (arg1:{[key in number|string]:boolean}|string,...args:string[]){
    const cns =typeof arg1 ==='object'? Object.keys(arg1).reduce((arr:(string|number)[],key)=>(arg1[key]?[...arr,key]:arr),[]):[arg1].concat(args)
    _setClassNames(extraClassName.concat(cns.map(arg=>prefix+'-'+arg)).join(' '))
  }
  
  return {
    setClassNames,classNames
  }
}
export default useClassName