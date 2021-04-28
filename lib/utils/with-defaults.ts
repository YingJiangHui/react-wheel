import React from 'react'
const withDefaults = <P,DP>(component:React.ComponentType<P>,defaultProps:DP)=>{
  // 所有属性变为可选 & 没有默认值的属性集合
  // 当使用有默认值的属性值时可以认为该属性是可选的，当使用没有默认值时可以认为该属性是必填的
  type Props = Partial<P> & Omit<P,keyof DP>
  component.defaultProps = defaultProps
  return component as React.ComponentType<Props>
}

export default withDefaults