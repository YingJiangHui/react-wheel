interface UseClassesProps{
  prefix?: string
}


const useClassName = (props:UseClassesProps={})=>{
  const {prefix} = props
  function classNames (p:{map?:{[key in string]:boolean},extra?:(string|undefined)[],classes?:string[]}) {
    const {map={}, extra=[], classes=[]} = p
    const classNames = (Object.keys(map)).reduce((arr: string[], key) => (map[key] ? [...arr, key] : arr), [])
    return classes.map((className)=>className.toString()).concat(classNames).map((className)=>prefix?prefix+'-'+className:className).concat(extra.filter(item=>Boolean(item)) as string[]).join(' ')
  }
  return {
    classNames
  }
}
export default useClassName