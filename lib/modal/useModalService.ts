import useToken from '../hooks/useToken';
import {useCallback,useEffect,useState} from 'react';
import useMouseClickPos from '../utils/useMouseClickPos';
import useViewportCenterCoordinate from '../utils/useViewportCenterCoordinate';
type UseModalServiceProps = {visible:boolean}
const defaultProps = {visible:false}
const useModalService = ({visible:_v}:UseModalServiceProps=defaultProps)=>{
  const [visible,setVisible] = useState(_v)
  const [clickPos] = useMouseClickPos()
  const [viewCenterPos] = useViewportCenterCoordinate()
  const close = useCallback(()=>{
    setVisible(false)
  },[])
  useEffect(()=>{
    setVisible(_v)
  },[_v])
  const getOriginTransition = useCallback(()=>{
    return [clickPos.x-viewCenterPos.x,clickPos.y-viewCenterPos.y]
  },[viewCenterPos,clickPos])
  return {visible,setVisible,close,clickPos,viewCenterPos,getOriginTransition}
}

export const ModalContext = useToken(useModalService)
export default useModalService