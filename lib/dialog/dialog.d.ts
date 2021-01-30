import React, { ReactElement } from 'react';
import './dialog.scss';
interface Props {
    visible: boolean;
    title?: string;
    onClose?: React.MouseEventHandler;
    clickMaskClose?: boolean;
    buttons?: Array<ReactElement>;
}
declare const Dialog: React.FC<Props>;
declare const modal: ({ content, yes, no, title, buttons, clickMaskClose }: {
    content: React.ReactNode;
    title?: string | undefined;
    buttons?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[] | undefined;
    no?: (() => void) | undefined;
    yes?: (() => void) | undefined;
    clickMaskClose?: boolean | undefined;
}) => () => void;
declare const confirm: ({ content, yes, title, no, clickMaskClose }: {
    content: string;
    title?: string | undefined;
    buttons?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[] | undefined;
    no?: (() => void) | undefined;
    yes?: (() => void) | undefined;
    clickMaskClose?: boolean | undefined;
}) => void;
declare const alert: ({ content, yes, clickMaskClose, title }: {
    content: string;
    title?: string | undefined;
    buttons?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[] | undefined;
    yes?: (() => void) | undefined;
    clickMaskClose?: boolean | undefined;
}) => void;
export { modal, confirm, alert };
export default Dialog;
