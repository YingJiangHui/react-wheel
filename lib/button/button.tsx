import React,{FC} from 'react';
import './button.scss';
import {scopedClass} from '../helper/scopedClass';
import withDefaults from '../utils/with-defaults';

const sc = scopedClass('makabaka-button');

type Props = {
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  type?: string,full?: boolean,disabled?: boolean,loading?: boolean,
}

const defaultProps = {
  full: false,disabled: false,loading: false,type: ''
};

export type ButtonProps = Props&React.AllHTMLAttributes<HTMLButtonElement>

const Button: FC<React.PropsWithChildren<ButtonProps&typeof defaultProps>> = ({children,className,htmlType,type,full,disabled,loading,...rest}) => {
  const classes = {
    [type || '']: Boolean(type),[type + '-full']: full
  };
  return <>
    <button disabled={disabled} type={htmlType} {...rest}
            className={sc(classes,{extra: ['makabaka-button',className || '']})}>
      {loading ? 'loading' : children}
      <style jsx>{`
         .makabaka-button {
            cursor: ${disabled?"no-drop":"auto"};
          }
 
      `}</style>
    </button>
  </>;
};
Button.defaultProps = {
  full: false,disabled: false,loading: false,type: ''
};
export default withDefaults(Button,defaultProps);