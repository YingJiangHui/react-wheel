import React from 'react';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './layout.example.scss';
import Aside from './Aside';

const LayoutExample = () => {
  return (
    <>
      <div className={'example'}>
        <Layout className={'example-layout'}>
          <Header className={'example-header'}>header</Header>
          <Content className={'example-content'}>content</Content>
          <Footer className={'example-footer'}>footer</Footer>
        </Layout>
      </div>
      <div className={'example'}>
        <Layout className={'example-layout'}>
          <Header className={'example-header'}>header</Header>
          <Layout>
            <Aside className={'example-aside'}>aside</Aside>
            <Content className={'example-content'}>content</Content>
          </Layout>
          <Footer className={'example-footer'}>footer</Footer>
        </Layout>
      </div>
      <div className={'example'}>
        <Layout className={'example-layout'}>
          <Header className={'example-header'}>header</Header>
          <Layout>
            <Content className={'example-content'}>content</Content>
            <Aside className={'example-aside'}>aside</Aside>
          </Layout>
          <Footer className={'example-footer'}>footer</Footer>
        </Layout>
      </div>
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
export default LayoutExample;