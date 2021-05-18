import useToken from '../hooks/useToken';
import {useCallback,useEffect,useState} from 'react';
type UseModalServiceProps = {visible?:boolean,onClose?:()=>void,confirmLoading?:boolean}
const defaultProps:UseModalServiceProps = {visible:false}
const useModalService = ({visible:_v,onClose,confirmLoading}:UseModalServiceProps = defaultProps)=>{
  const [visible,setVisible] = useState(_v)
  useEffect(()=>{
    if(!confirmLoading)
      setVisible(_v)
  },[_v,confirmLoading])
  const emitCloseEvent = useCallback( ()=>{
    !confirmLoading&&onClose?.()
  },[])
  return {visible,setVisible,emitCloseEvent} as const
}

export const ModalContext = useToken(useModalService)
export default useModalService