import React,{FC} from 'react';
import Button from '../button/button';
type Props = {}
const defaultProps = {};
type ModalActionProps = Props&typeof defaultProps
const ModalAction: FC<ModalActionProps> = ({children}) => {

  return (<Button className="modal-action">{children}
      <style jsx>{`
        .modal-action {
          border: none;
          flex-grow: 1;
          border-right: 1px solid #dadada;
          margin-right: -1px;
        }
      `}</style>
    </Button>);
};

export default ModalAction;