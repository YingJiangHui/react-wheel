import useTimeout from '../useTimeout';
import {renderHook} from '@testing-library/react-hooks';
jest.useFakeTimers();

describe('useTimeout 测试用例',()=>{
  it('同一个key不会重复创建多次',()=>{
    const {result} = renderHook(()=>useTimeout())
    const fn = jest.fn()
    result.current.setTimeout('1',fn,1000)
    result.current.setTimeout('1',fn,1000)
    result.current.setTimeout('1',fn,1000)
    jest.advanceTimersByTime(1200); //时间快进
    expect(fn.mock.calls.length).toBe(1)
  })
  it('不会同一个key之间的定时器不相关（可以多次执行）',()=>{
    const {result} = renderHook(()=>useTimeout())
    const fn = jest.fn()
    result.current.setTimeout('1',fn,1000)
    result.current.setTimeout('2',fn,1000)
    result.current.setTimeout('3',fn,1000)
    jest.advanceTimersByTime(1200); //时间快进
    expect(fn.mock.calls.length).toBe(3)
  })
  it('注销所有组件时清除所有定时器',()=>{
    // 目前还不会
  })
})