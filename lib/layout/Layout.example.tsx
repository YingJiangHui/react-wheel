import React from 'react'
import Layout from './Layout'
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './layout.example.scss'
const LayoutExample = ()=>{
  return (
    <Layout className={'example-layout'}>
      <Header className={'example-header'}>header</Header>
      <Content className={'example-content'}>content</Content>
      <Footer className={'example-footer'}>footer</Footer>
    </Layout>
  )
}
export default LayoutExample