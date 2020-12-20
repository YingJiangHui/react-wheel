import React from 'react';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './layout.example.scss';

const LayoutExample1 = () => {

  return (
    <>
      <div className={'example'}>
        <Layout className={'example-layout'}>
          <Header className={'example-header'}>header</Header>
          <Content className={'example-content'}>content</Content>
          <Footer className={'example-footer'}>footer</Footer>
        </Layout>
      </div>
    </>
  );
};

export default LayoutExample1;