import React, {FunctionComponent} from 'react';
import './importIcons';
import './icon.scss';

interface Props {
  name: string
  onClick?:React.MouseEventHandler<SVGElement>
}

const Icon: FunctionComponent<Props> = (props) => {
  return (
    <svg className={'xxx-icon'} onClick={props.onClick}>
      <use xlinkHref={'#' + props.name}></use>
    </svg>
  );
};
export default Icon;