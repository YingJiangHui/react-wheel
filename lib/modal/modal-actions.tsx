import React,{FC} from 'react';
type Props = {}
const defaultProps = {};
type ModalActionsProps = Props&typeof defaultProps
const ModalActions: FC<ModalActionsProps> = ({children}) => {
  console.log(Array.isArray(children)&& children.filter((child)=>React.isValidElement(child)).length===children.length)

   // [React.cloneElement(children[0])].concat(React.cloneElement(children[children.length-1]))
  return (<footer className="modal-actions">
    {children}
    <style jsx>{`
      .modal-actions {
        border-top:1px solid #dadada;
        display: flex;
      }
    
    `}</style>
  </footer>);
};

export default ModalActions;