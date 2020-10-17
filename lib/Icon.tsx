import React, {FunctionComponent} from 'react';
import './importIcons';
import './icon.scss';

interface Props {
  name: string
}

const Icon: FunctionComponent<Props> = (props) => {
  return (
    <svg className={'xxx-icon'}>
      <use xlinkHref={'#' + props.name}></use>
    </svg>
  );
};
export default Icon;