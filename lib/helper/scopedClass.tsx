interface ClassToggles {
  [key: string]: boolean
}
interface Options{
  prefixIsClass?:boolean
  extra?:string[]
}
const scopedClass = (prefix: string) =>
  (cn?: string | ClassToggles,options?:Options) =>{
    return Object.entries(cn instanceof Object ? cn : {[cn||'']: true})
      .filter(kv => kv[1] !== false)
      .map(kv=>kv[0])
      .map(cn => [prefix, cn]
        .filter(Boolean)
        .join('-'))
      .concat(options&&options.extra&&options.extra||[])
      .join(' ');
  }
export {scopedClass};