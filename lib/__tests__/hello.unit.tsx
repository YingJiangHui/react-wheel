
describe('button', () => {
  function add(a: number, b: number) {
    return a + b
  }
  it('第一个测试用例', () => {
    expect(add(1,2)).toEqual(3)
  })
})