import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '../Icon'

describe('测试icon',()=>{
  it('icon代码快照是否正确',()=>{
    const json = renderer.create(<Icon name={'pay'}/>).toJSON()
    expect(json).toMatchSnapshot()
  })
})