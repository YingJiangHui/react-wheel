import React,{FC} from 'react';

type Props = {}
const defaultProps = {};
type ModalTitleProps = Props&typeof defaultProps

const ModalTitle: FC<ModalTitleProps> = ({children}) => {
  
  return (<h2 className='modal-title'>{children}
    <style jsx={true}>{`
      .modal-title {
        line-height: 1.6;
        font-size: 1.6rem;
        text-align: center;
        font-weight: normal;
        padding: 0;
      }
    `}</style>
  </h2>);
};

export default ModalTitle;