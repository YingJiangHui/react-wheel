import React,{FC} from 'react';
import Button from '../button/button';
type Props = {}
const defaultProps = {};
type ModalActionProps = Props&typeof defaultProps
const ModalAction: FC<ModalActionProps> = ({children}) => {

  return (<Button className="modal-action">{children}
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