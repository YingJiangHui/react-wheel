import React,{FC,useContext} from 'react';
import Button,{ButtonProps} from '../button/button';
import {ModalContext} from './useModalService';
type Props = {}
const defaultProps = {};

type ModalActionProps = Props & typeof defaultProps & React.AllHTMLAttributes<HTMLButtonElement> & ButtonProps

const ModalAction: FC<ModalActionProps> = ({children,onClick,...rest}) => {
  const modalService = useContext(ModalContext)
  const _onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    modalService.emitCloseEvent()
    onClick?.(event)
  }
  return (<Button onClick={_onClick} className="modal-action" {...rest}>{children}
      <style jsx>{`
        .modal-action {
          font-size: 14px;
          color: #666;
          padding: 1em 0;
          flex-grow: 1;
        }
      `}</style>
    </Button>);
};

export default ModalAction;