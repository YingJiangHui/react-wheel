import React,{FC} from 'react';

type Props = {}
const defaultProps = {};
type ModalContentProps = Props&typeof defaultProps

const ModalContent: FC<ModalContentProps> = ({children}) => {
  
  return (<div className="modal-content">
    <p className="modal-text">
      {children}
    </p>
    <style jsx>{`
      .modal-content {
        padding-top: 1em;
        padding-bottom: 0.5em;
        text-align: left;
      }
      .modal-text{
      padding: 0;
       line-height: 1.625em
      }
    `}</style>
  </div>);
};

export default ModalContent;