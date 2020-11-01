import classes from '../classes'
import {scopedClass} from '../scopedClass'

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
  it('接收 数组',()=>{
    expect(classes(['aaa','bbb','中文'])).toEqual('aaa bbb 中文')
  })
  it('接收 对象',()=>{
    expect(classes({'aaa':false,'bbb':true,'ddd':true})).toEqual('bbb ddd')
  })
})
describe('测试scopedClass函数',()=>{
  const sc = scopedClass('x')
  it('不接受参数',()=>{
    expect(sc()).toEqual('x')
  })
  it('接收一个字符串',()=>{
    expect(sc('aaa')).toEqual('x-aaa')
  })
  it('接收对象',()=>{
    const obj = {
      'aaa':true,
      'bbb':false,
      'ccc':'',
      'ddd':'ddd',
      'eee':[],
      'fff':{}
    }
    expect(sc(obj)).toEqual('x-aaa x-ccc x-ddd x-eee x-fff')
    console.log(sc(obj))

  })
  it('接收额外的class',()=>{
    expect(sc('aaa',{extra:['aaa','vvv']})).toEqual('x-aaa aaa vvv')
  })
})