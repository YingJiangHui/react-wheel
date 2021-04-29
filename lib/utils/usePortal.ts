import {useEffect,useState} from 'react';
import {getId} from './collections';

const createElement = (id:string)=>{
  const div = document.createElement('div')
  div.setAttribute('id',id)
  return div
}
const usePortal = (selectorId:string = getId(),getContainer?:()=>HTMLElement|null)=>{
  const [elSnapshot,setSnapshot] = useState<HTMLElement>(createElement(selectorId))
  useEffect(()=>{
    const customContainer = getContainer?.() || null
    const hasElement = document.querySelector<HTMLElement>(`#${selectorId}`)
    const parentElement =  customContainer || document.body
    const el = hasElement || createElement(getId())
    if(!hasElement){
      parentElement.appendChild(el)
    }
    setSnapshot(el)
  },[])

  //创建
  return elSnapshot
}
export default usePortal