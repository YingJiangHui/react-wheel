import React from 'react';
import './button.scss';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    type?: string;
    full?: boolean;
}
declare const Button: React.FunctionComponent<Props>;
export default Button;
