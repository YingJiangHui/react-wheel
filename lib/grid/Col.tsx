import React,{FC,useEffect} from 'react';
import useClassName from '../hooks/useClassName';
import './Col.scss'
interface ColProps {
  children?: React.ReactNode
  span?: number
  offset?: number
  className?: string
}
const Col:FC<ColProps> = (props)=>{
  const {classNames,setClassNames} = useClassName({prefix:'makabaka-col',extraClassName:['makabaka-col']})
  const {children,span:_span,offset:_offset,className=''} = props

  useEffect(()=>{
    const span = `span-${_span}`
    const offset = `offset-${_offset}`
    console.log(span)
    console.log(offset)

    setClassNames({
      [className]:Boolean(className),
      [span]: Boolean(_span),
      [offset]: Boolean(_offset)
    })
  },[_span,_offset])
  return (<div className={classNames}>
    {children}
  </div>)
}

export default Col