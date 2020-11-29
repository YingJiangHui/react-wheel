import React from 'react'
interface HeaderProps {

}
const Header:React.FC<HeaderProps> = ({children})=>{
  return (
    <div>{children}</div>
  )
}
export default Header