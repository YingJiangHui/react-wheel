import React, { FunctionComponent } from 'react';
import './importIcons';
import './icon.scss';
interface Props extends React.HTMLAttributes<SVGElement> {
    name: string;
}
declare const Icon: FunctionComponent<Props>;
export default Icon;
