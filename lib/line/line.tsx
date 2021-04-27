import React,{FC} from 'react'
import useClassName from '../hooks/useClassName';
import './line.scss'
interface LineProps {
  grayLevel?:number
  className?:string
}

const Line:FC<LineProps> = (props)=>{
    const {grayLevel=3,className} = props
    const {classNames} = useClassName({prefix:'makabaka-line'})
    return (
    <div className={classNames({extra:[className,'makabaka-line'],classes:[`gray-level-${grayLevel}`]})} />
    )
}

export default Line