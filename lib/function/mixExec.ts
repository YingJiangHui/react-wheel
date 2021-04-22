function mixExec<MF extends Function>(fn1?: MF) {
  return function <OF extends Function>(fn2?: OF) {
    return function <E>(e: E) {
      fn2?.(e);
      return fn1?.(e);
    };
  };
}

export default mixExec
