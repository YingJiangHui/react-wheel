import React from 'react'

interface Props<T> extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>,HTMLFormElement>{
  onFinish?: ()=>void
}

function Form<T> (props:Props<T>){
  const { onFinish,children,...reset} = props
  
  return (<form onSubmit={onFinish} {...reset}>
    {children}
  </form>)
}

export default Form