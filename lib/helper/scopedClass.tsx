function scopedClass(prefix:string){
  return function(cn?:string){
    return [prefix,cn].filter(Boolean).join('-')
  }
}
export {scopedClass}