import React,{FC} from 'react';

type Props = {}
const defaultProps = {};
type ModalSubTitleProps = Props&typeof defaultProps

const ModalSubTitle: FC<ModalSubTitleProps> = ({children}) => {
  
  return (<h3 className="modal-sub-title">
    {children}
    <style jsx>{`
      .modal-sub-title {
        padding: 0;
        height: 1.5rem;
        font-weight: normal;
        color: #666;
        font-size: 1rem;
        line-height: 1.5rem;
      }
    `}</style>
  </h3>);
};

export default ModalSubTitle;