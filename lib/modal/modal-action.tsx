import React,{FC} from 'react';
import Button from '../button/button';

type Props = {}
const defaultProps = {};
type ModalActionProps = Props&typeof defaultProps

const ModalAction: FC<ModalActionProps> = ({children}) => {
  
  return (<>
    <Button className="modal-action">{children}</Button>
    <style jsx>{`
      .modal-action{
        flex-grow: 1;
      }
    `}</style>
  </>);
};

export default ModalAction;