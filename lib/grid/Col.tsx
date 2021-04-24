import React, {FC} from 'react';
import useClassName from '../hooks/useClassName';
import './Col.scss'

interface ColProps {
  children?: React.ReactNode
  span?: number
  offset?: number
  className?: string
}

const Col: FC<ColProps> = (props) => {
  const {classNames} = useClassName({prefix: 'makabaka-col'})
  const {children, span: _span, offset: _offset, className = ''} = props
  const span = `span-${_span}`
  const offset = `offset-${_offset}`
  
  return (<div className={classNames({map:{
    [className]: Boolean(className),
    [span]: Boolean(_span),
    [offset]: Boolean(_offset)
  },extra:['makabaka-col']})}>
    {children}
  </div>)
}

export default Col