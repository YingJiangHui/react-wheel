import Button from '../button'
import renderer from 'react-test-renderer'
import React from 'react'

describe('测试按钮',()=>{
  it('按钮快照',()=>{
    const json = renderer.create(<Button/>).toJSON()
    expect(json).toMatchSnapshot()
  })
})