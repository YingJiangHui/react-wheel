import React from 'react';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './layout.example.scss';
import Aside from './Aside';

const LayoutExample4 = () => {
  
  return (
    <>
      <div className={'example'}>
        <Layout className={'example-layout'}>
          <Aside className={'example-aside'}>aside</Aside>
          <Layout>
            <Header className={'example-header'}>header</Header>
            <Content className={'example-content'}>content</Content>
            <Footer className={'example-footer'}>footer</Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default LayoutExample4;