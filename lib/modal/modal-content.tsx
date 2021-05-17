import React,{FC} from 'react';

type Props = {}
const defaultProps = {};
type ModalContentProps = Props&typeof defaultProps

const ModalContent: FC<ModalContentProps> = ({children}) => {
  
  return (<div className="modal-content">
    {children}
    <style jsx>{`
      .modal-content{
        padding: 0.6em 2em;
        text-align: left;
        min-height: 5em;
      }
    `}</style>
  </div>);
};

export default ModalContent;