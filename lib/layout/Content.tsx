import React from 'react'
interface ContentProps {

}
const Content:React.FC<ContentProps> = ({children})=>{
  return (
    <div>{children}</div>
  )
}
export default Content