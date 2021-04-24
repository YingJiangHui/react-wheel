import React from 'react'
import useClassName from '../hooks/useClassName';
import './Row.scss'
interface RowProps {
  children?: React.ReactNode
  className?: string
}

const Row:React.FC = (props:RowProps)=>{
  const {children,className=''} = props
  const {classNames} = useClassName({prefix:'makabaka-row'})
  return (<div className={classNames({extra:['makabaka-row',className]})}>{children}</div>)
}

export default Row