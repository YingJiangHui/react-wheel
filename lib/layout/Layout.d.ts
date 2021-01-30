import React, { ReactElement } from 'react';
import './layout.scss';
import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
interface LayoutProps {
    className?: string;
    children: ReactElement | Array<ReactElement>;
}
declare const Layout: React.FC<LayoutProps>;
export default Layout;
export { Header, Footer, Content, Aside, Layout };
