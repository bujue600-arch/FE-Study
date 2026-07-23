function add(a, b) {
  return a + b;
}

//Call 一个个传参
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx ?? globalThis;
  const key = Symbol();
  ctx[key] = this;
  const res = ctx[key](...args);
  delete ctx[key];
  return res;
};
console.log(add.myCall({}, 1, 2));

//Apply 传一个数组
Function.prototype.myApply = function (ctx, arr) {
  return this.myCall(ctx, ...arr);
};
console.log(add.myApply({}, [1, 2]));

//Bind 只绑定不执行，一个个传
Function.prototype.myBind = function (context, ...args1) {
  // 保存原函数
  const originalFn = this;

  // 返回一个新函数
  const boundFn = function (...args2) {
    // 🔑 关键判断：是否被 new 调用了？
    // this instanceof boundFn 为 true 说明是 new 调用
    const thisArg = this instanceof boundFn ? this : context;

    // 合并参数并执行
    return originalFn.call(thisArg, ...args1, ...args2);
  };

  // 重要：保持原函数的 prototype 链（支持 new 操作）
  boundFn.prototype = originalFn.prototype;

  return boundFn;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const obj = {
  custom: "自定义",
};

const boundFn = Person.myBind(obj, "xm");

// boundFn(20);
// console.log(obj);

const p = new boundFn(20);
console.log(p.name);
console.log(p.age);
console.log(obj.age);
