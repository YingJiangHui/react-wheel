import React from 'react'
import Layout from './Layout'
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const LayoutExample = ()=>{
  return (
    <Layout>
      <Header>header</Header>
      <Content>content</Content>
      <Footer>footer</Footer>
    </Layout>
  )
}
export default LayoutExample