import renderer from "react-test-renderer";
import React from "react";
import Layout from "../Layout";
import Header from "../Header";
import Content from "../Content";
import Footer from "../Footer";
import Aside from "../Aside";

describe('Layout测试用例',()=>{
  it('上中下布局',()=>{
    const json = renderer.create(<Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>).toJSON()
    expect(json).toMatchSnapshot()
  })
  
  it('上中下加上侧边栏',()=>{
    const json = renderer.create(<Layout>
      <Header>Header</Header>
      <Layout>
        <Aside>Aside</Aside>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>).toJSON()
    expect(json).toMatchSnapshot()
  })
  it('上中下加上右边侧边栏',()=>{
    const json = renderer.create(<Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Aside>Aside</Aside>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>).toJSON()
    expect(json).toMatchSnapshot()
  })
  
  it('上中下加侧边栏自适应高度',()=>{
    const json = renderer.create(<Layout>
      <Aside>Aside</Aside>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>).toJSON()
    expect(json).toMatchSnapshot()
  })
})