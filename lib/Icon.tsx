import React, {FunctionComponent} from 'react';
import './importIcons'
interface Props {
  name:string
}
const Icon:FunctionComponent<Props>  = (props)=>{
  return (
    <div>
      <svg>
        <use xlinkHref={'#'+props.name}></use>
      </svg>
    </div>
  )
}
export default Icon