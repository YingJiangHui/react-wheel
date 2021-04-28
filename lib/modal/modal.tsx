import React,{FC} from 'react';
import ModalAction from './modal-action';
import ModalActions from './modal-actions';
import ModalTitle from './modal-title';
import ModalContent from './modal-content';

interface Props {

}

const defaultProps = {};
export type ModalProps = Props&typeof defaultProps&React.AllHTMLAttributes<any>
const Modal: FC<React.PropsWithChildren<ModalProps>> = ({}) => {
  
  return (<></>);
};
type ModalComponent<P = {}> = React.FC<P>&{
  Title: typeof ModalTitle,Action: typeof ModalAction,Actions: typeof ModalActions
  Content: typeof ModalContent
}
export default Modal as ModalComponent<ModalProps>;