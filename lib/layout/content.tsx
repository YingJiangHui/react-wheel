import React from 'react'
import './content.scss'
interface Props{

}
const Content:React.FC<Props> = ({children})=>{
  return (<div>{ children} </div>)
}
export default Content