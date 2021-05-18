import React,{FC} from 'react';
import ReactDOM from 'react-dom'
import ModalAction from './modal-action';
import ModalActions from './modal-actions';
import ModalTitle from './modal-title';
import ModalContent from './modal-content';
import useModalService,{ModalContext} from './useModalService';
import ModalWrapper from './modal-wrapper';
import Backdrop from '../shared/backdrop';
import usePortal from '../utils/usePortal';
import ModalSubTitle from './modal-sub-title';

interface Props {
  visible: boolean,
  onClose?:()=>void,
  confirmLoading?:boolean,
}

const defaultProps = {visible: false,confirmLoading: false};
export type ModalProps = Props & typeof defaultProps & React.AllHTMLAttributes<any>
const Modal: FC<React.PropsWithChildren<ModalProps>> = ({children,...serviceProps}) => {
  const modalService = useModalService(serviceProps)
  const portal = usePortal()

  return ReactDOM.createPortal(<ModalContext.Provider value={modalService}>
      <Backdrop width="396px" visible={modalService.visible} onClick={modalService.emitCloseEvent}>
        <ModalWrapper>{children}</ModalWrapper>
      </Backdrop>
  </ModalContext.Provider>,portal);
};
type ModalComponent<P = {}> = React.FC<P>&{
  Title: typeof ModalTitle,Action: typeof ModalAction,Actions: typeof ModalActions,Content: typeof ModalContent,SubTitle: typeof  ModalSubTitle
}
export default Modal as ModalComponent<ModalProps>;