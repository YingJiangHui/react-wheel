import React,{FC} from 'react';
import withDefaults from '../utils/with-defaults';

type Props = {}
const defaultProps = {};
type ModalActionsProps = Props&typeof defaultProps
const ModalActions: FC<ModalActionsProps> = ({children}) => {
  return (<>
    <div className={'modal-footer-shim'}>
      <style jsx>{`
        .modal-footer-shim {
          width: 100%;
          height: 3.625rem;
        }
      `}</style>
    </div>
    <footer className="modal-actions">
      {children}
    </footer>
    <style jsx>{`
      .modal-actions {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 1px solid #eaeaea;
        display: flex;
        height: 3.625rem;
      }
      
      .modal-action {
        border: none;
        border-right: 1px solid #eaeaea;
      }
      
      .modal-action:last-child {
        border-right: none;
      }
    `}</style>
  </>);
};

export default withDefaults(ModalActions,defaultProps) ;