import React, {FunctionComponent} from 'react';
import './importIcons';
import './icon.scss';
import classes from '../helper/classes'
interface Props extends React.HTMLAttributes<SVGElement>{
  name: string
}

const Icon: FunctionComponent<Props> = ({className,name,...restProps}) => {
  return (
    <svg className={classes('xxx-icon',className)} {...restProps}>
      <use xlinkHref={'#' + name} ></use>
    </svg>
  );
};
export default Icon;