const arrToObj = (arr: [string, unknown][]) =>
  arr.reduce<{ [key: string]: unknown }>((res, [key, val]) => {
    res[key] = val;
    return res;
  }, {});

export default arrToObj;
