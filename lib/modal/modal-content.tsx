import React,{FC} from 'react';

type Props = {}
const defaultProps = {};
type ModalContentProps = Props&typeof defaultProps

const ModalContent: FC<ModalContentProps> = ({children}) => {
  
  return (<div className="modal-content">
    {children}
    <style jsx>{`
      .modal-content{
        margin-left: 1em;
        margin-right: 1em;
      }
    `}</style>
  </div>);
};

export default ModalContent;