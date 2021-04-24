interface UseClassesProps{
  prefix?: string
}


const useClassName = (props:UseClassesProps={})=>{
  const {prefix} = props
  
  function classNames(arg1:{[key in number|string]:boolean}):string
  function classNames(arg1:string, ...args:string[]):string
  function classNames(arg1:(string)[], ...args:string[]):string
  function classNames (arg1:{[key in number|string]:boolean}|string|string[],...args:string[]){
    let cns:(string|number)[] = []
    if(arg1.constructor === Object){
      cns= (Object.keys(arg1) as (string|number)[]).reduce((arr:(string|number)[],key)=>(arg1[key as number]?[...arr,key]:arr),[])
    }else if(arg1.constructor === String){
      cns = [arg1]
    }
    cns = cns.concat(args).map(arg=>prefix?prefix+'-'+arg:arg.toString())
    if(arg1.constructor === Array){
      return arg1.concat(cns as string[]).join(' ')
    }
    return cns.join(' ')
  }
  return {
    classNames
  }
}
export default useClassName