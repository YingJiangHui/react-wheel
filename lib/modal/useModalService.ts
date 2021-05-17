import useToken from '../hooks/useToken';
import {useCallback,useEffect,useState} from 'react';
type UseModalServiceProps = {visible?:boolean,onClose?:()=>void}
const defaultProps:UseModalServiceProps = {visible:false}
const useModalService = ({visible:_v,onClose}:UseModalServiceProps = defaultProps)=>{
  const [visible,setVisible] = useState(_v)
  useEffect(()=>{
    setVisible(_v)
  },[_v])
  const emitCloseEvent = useCallback( ()=>{
    onClose?.()
  },[])
  return {visible,setVisible,emitCloseEvent} as const
}

export const ModalContext = useToken(useModalService)
export default useModalService