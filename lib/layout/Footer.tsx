import React from 'react'
interface FooterProps {

}
const Footer:React.FC<FooterProps> = ({children})=>{
  return (
    <div>{children}</div>
  )
}
export default Footer