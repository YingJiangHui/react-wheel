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

interface Props {
  visible: boolean,
  onClose?:()=>void
}

const defaultProps = {visible: false};
export type ModalProps = Props&typeof defaultProps&React.AllHTMLAttributes<any>
const Modal: FC<React.PropsWithChildren<ModalProps>> = ({children,visible,onClose}) => {
  const modalService = useModalService({visible,onClose})
  const portal = usePortal()

  return ReactDOM.createPortal(<ModalContext.Provider value={modalService}>
    <Backdrop width="320px" visible={modalService.visible} onClick={modalService.emitCloseEvent}>
      <ModalWrapper>{children}</ModalWrapper>
    </Backdrop>
  </ModalContext.Provider>,portal);
};
type ModalComponent<P = {}> = React.FC<P>&{
  Title: typeof ModalTitle,Action: typeof ModalAction,Actions: typeof ModalActions,Content: typeof ModalContent
}
export default Modal as ModalComponent<ModalProps>;