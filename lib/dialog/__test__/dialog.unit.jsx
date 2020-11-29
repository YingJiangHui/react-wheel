import {modal,alert,confirm} from '../dialog'

describe("dialog组件 modal方法测试",()=>{
  it('打开了',()=>{
    modal({content:'content',title:'title'})
  })
})