import useClassName from '../useClassName';
import {act,renderHook} from '@testing-library/react-hooks';

describe('useClassName 测试用例',() => {
  it('可以传入多个参数转换为class名称',() => {
    const {result} = renderHook(() => useClassName({prefix: 'lll'}));
    act(() => {
      result.current.setClassNames('1','2','3','4');
    });
    expect(result.current.classNames).toBe('lll-1 lll-2 lll-3 lll-4');
  });
  it('可以通过布尔类型的值进行判断是否需要使用该className',() => {
    const {result} = renderHook(() => useClassName({prefix: 'lll'}));
    act(() => {
      result.current.setClassNames({
        '1': false,'2': true,'3': false,'4': true
      });
    });
    
    expect(result.current.classNames).toBe('lll-2 lll-4');
  });
  
  it('可以传入多个参数转换为class名称',() => {
    const {result} = renderHook(() => useClassName({prefix: 'lll',extraClassName:['a' ,'b','c']}));
    act(() => {
      result.current.setClassNames('1','2','3','4');
    });
    expect(result.current.classNames).toBe('a b c lll-1 lll-2 lll-3 lll-4');
  });
  it('可以传入多个参数转换为class名称',() => {
    const {result} = renderHook(() => useClassName({extraClassName:['a' ,'b','c']}));
    expect(result.current.classNames).toBe('a b c');
  
  });
});