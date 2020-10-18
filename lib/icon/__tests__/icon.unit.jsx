import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '../Icon'
import {mount} from 'enzyme'

describe('测试icon', () => {
  it('icon代码快照是否正确', () => {
    const json = renderer.create(<Icon name={'pay'}/>).toJSON()
    expect(json).toMatchSnapshot()
  })
  it('点击icon', () => {
    const fn = jest.fn()
    const component = mount(<Icon name={'pay'} onClick={fn}/>)
    component.find('svg').simulate('click')
    expect(fn).toBeCalled()
  })
})