import useCounter from "../useCounter";
import {act, renderHook} from "@testing-library/react-hooks";

describe('useCounter 测试用例',()=>{
  it('可以增加',()=>{
    const { result } = renderHook(() => useCounter())
  
    act(() => {
      result.current.increment()
      result.current.increment()
    })
  
    expect(result.current.count).toBe(2)
  })
  it('可以重置',()=>{
    const {result} = renderHook(()=>useCounter())
    act(()=>{
      result.current.increment()
      result.current.increment()
      result.current.increment()
      result.current.reset()
    })
    expect( result.current.count).toBe(0)
  })
})