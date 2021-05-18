import React,{FC,useContext} from 'react';
import Button,{ButtonProps} from '../button/button';
import {ModalContext} from './useModalService';
import withDefaults from '../utils/with-defaults';

type Props = {}
const defaultProps = {};

export type ModalActionProps = Props&ButtonProps&typeof defaultProps
const ModalAction: FC<React.PropsWithChildren<ModalActionProps>> = ({children,className,...rest}) => {
  const modalService = useContext(ModalContext);
  return (<Button onClick={modalService.emitCloseEvent} className={`modal-action ${className}`} {...rest}>{children}
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

export default withDefaults(ModalAction,defaultProps);