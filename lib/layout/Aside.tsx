import React from 'react'
interface AsideProps {

}
 const Aside:React.FC<AsideProps> = ({children})=>{
  return (
    <div>{children}</div>
  )
}
export default Aside