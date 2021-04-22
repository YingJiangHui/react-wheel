interface ClassToggles {
  [key: string]: boolean
}
interface Options{
  prefixIsClass?:boolean
  extra?:string[]
}
const scopedClass = (prefix: string) =>
  (cn?: number|string | ClassToggles,options?:Options) =>
     Object.entries(cn instanceof Object ? cn : {[cn?.toString()||'']: true})
      .filter(kv => kv[1] !== false)
      .map(kv=>kv[0])
      .map(cn => [prefix, cn]
        .filter(Boolean)
        .join('-'))
      .concat(options&&options.extra&&options.extra||[])
      .filter(Boolean)
      .join(' ');


export {scopedClass};
