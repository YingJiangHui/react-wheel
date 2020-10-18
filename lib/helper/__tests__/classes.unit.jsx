import classes from '../classes'
describe('测试classes函数',()=>{
  it('接收 0 个参数',()=>{
    expect(classes()).toEqual('')
  })
  it('接收 1 个参数',()=>{
    expect(classes('aaa')).toEqual('aaa')
  })
  it('接收 2 个参数',()=>{
    expect(classes('aaa','bbb')).toEqual('aaa bbb')
  })
  it('接收 undefined',()=>{
    expect(classes('aaa',undefined)).toEqual('aaa')
  })
  it('接收 多个奇怪的参数',()=>{
    expect(classes('aaa','中文',false,null)).toEqual('aaa 中文')
  })
})