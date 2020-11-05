import React from 'react'
import Layout from "./layout";
import Header from "./header"
import Content from "./content"
import Footer from "./footer"
import './layoutExample.scss'
const LayoutExample = ()=>{
  return (
    <>
      <div>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    </>
  )
}
export default LayoutExample