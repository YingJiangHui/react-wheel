import React from 'react'
import useClassName from '../hooks/useClassName';
import './Row.scss'
interface RowProps {
  children?: React.ReactNode
  className?: string
}

const Row:React.FC = (props:RowProps)=>{
  const {children,className=''} = props
  const {classNames} = useClassName({extraClassName:['makabaka-row',className]})
  return (<div className={classNames}>{children}</div>)
}

export default Row