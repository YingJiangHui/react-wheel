import React,{FC} from 'react';

type Props = {}
const defaultProps = {}
type ModalTitleProps  = Props&typeof defaultProps

const ModalTitle: FC<ModalTitleProps> = ({children}) => {
  
  return (<div>
      <h3 className='modal-title'>{children}</h3>
      <style jsx={true}>{`
        .modal-title {
          text-align: center;
        }
      `}</style>
    </div>);
};

export default ModalTitle;