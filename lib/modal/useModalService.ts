import useToken from '../hooks/useToken';
import {useCallback,useEffect,useState} from 'react';
import useMouseClickPos from '../utils/useMouseClickPos';
type UseModalServiceProps = {visible:boolean}
const defaultProps = {visible:false}
const useModalService = ({visible:_v}:UseModalServiceProps=defaultProps)=>{
  const [visible,setVisible] = useState(_v)
  const [pos] = useMouseClickPos()
  
  useEffect(()=>{
    setVisible(_v)
  },[_v])
  const close = useCallback(()=>{
    setVisible(false)
  },[])
  return {visible,setVisible,close,pos}
}

export const ModalContext = useToken(useModalService)
export default useModalService