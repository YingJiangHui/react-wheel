import React from 'react'
import ReactDOM from 'react-dom'
import Dialog, {modal,alert,confirm} from '../dialog'
import renderer from 'react-test-renderer'
import Button from "../../button/button";
import {act} from "react-dom/test-utils";

describe('dialog组件',()=>{
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  });
  
  it('弹出框快照',()=>{
    const json = renderer.create(<Dialog visible={true} title="title" >content</Dialog>).toJSON()
    expect(json).toMatchSnapshot()
  })
})

describe("modal方法测试",()=>{


  it('可以显示和隐藏弹出框',()=>{
    const yes = jest.fn()
    const no = jest.fn()
    const close = modal({content:'content',title:'title',yes,no})
    expect(!!document.querySelector('body>div')).toBeTruthy()
    close()
    expect(!!document.querySelector('body>div')).toBeFalsy()
  })
  it('可以点击确认按钮',()=>{
    const yes = jest.fn()
    modal({content:'content',title:'title',yes})
    const yesBtn = document.querySelector('body>div [data-test-yes=toggle]')
    act(()=>{
      yesBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(yes).toBeCalled()
  })
  it('可以点击取消按钮',()=>{
    const no = jest.fn()
    modal({content:'content',title:'title',no})
    const noBtn = document.querySelector('body>div [data-test-no=toggle]')
    act(()=>{
      noBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(no).toBeCalled()
  })
  
})
describe("alert 方法测试用例",()=>{
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  });
  
  it('可以点击确认按钮',()=>{
    const yes = jest.fn()
    alert({content:'content',title:'title',yes})
    const yesBtn = document.querySelector('body>div [data-test-yes=toggle]')
    act(()=>{
      yesBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(yes).toBeCalled()
  })
  
})

describe("confirm 方法测试用例",()=>{
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  });
  it('可以点击确认按钮',()=>{
    const yes = jest.fn()
    confirm({content:'content',title:'title',yes})
    const yesBtn = document.querySelector('body>div [data-test-yes=toggle]')
    act(()=>{
      yesBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(yes).toBeCalled()
  })
  it('可以点击取消按钮',()=>{
    const no = jest.fn()
    confirm({content:'content',title:'title',no})
    const noBtn = document.querySelector('body>div [data-test-no=toggle]')
    act(()=>{
      noBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    expect(no).toBeCalled()
  })
  
})