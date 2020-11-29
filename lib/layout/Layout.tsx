import React from 'react'
interface LayoutProps{

}
const Layout:React.FC<LayoutProps> = ({children})=>{
  return (
    <div>{children}</div>
  )
}
export default Layout