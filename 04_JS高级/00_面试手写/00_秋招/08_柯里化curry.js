function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}

// 原函数：有 3 个形参，所以 sum.length 是 3
function sum(a, b, c) {
  return a + b + c;
}

// 使用 curry 包裹它
const curriedSum = curry(sum);
console.log(curriedSum(1, 2)(3)); // 输出 6
console.log(curriedSum(1)(2, 3)); // 输出 6
