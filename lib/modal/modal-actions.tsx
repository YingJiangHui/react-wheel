import React,{FC} from 'react';

type Props = {}
const defaultProps = {};
type ModalActionsProps = Props&typeof defaultProps

const ModalActions: FC<ModalActionsProps> = ({children}) => {
  
  return (<footer>
    {children}
    <style jsx>{`
      footer {
        display: flex;
      }
    `}</style>
  </footer>);
};

export default ModalActions;