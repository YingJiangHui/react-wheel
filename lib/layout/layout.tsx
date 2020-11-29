import React from 'react'
import './layout.scss'
interface Props {

}
const Layout:React.FC<Props> = ({children})=>{
  return (
    <div className={'x-layout'}>
      {children}
    </div>
  )
}
export default Layout