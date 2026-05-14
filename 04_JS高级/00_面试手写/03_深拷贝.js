// ==================== 第一版：基础版本 ====================
function deepClone1(obj) {
  // 基本类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 创建新对象/数组
  const clone = Array.isArray(obj) ? [] : {};

  // 递归复制属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone1(obj[key]);
    }
  }

  return clone;
}

// 测试基础版本
const obj1 = {
  name: '张三',
  age: 25,
  hobbies: ['reading', 'coding'],
  address: {
    city: '北京',
    district: '朝阳'
  }
};

console.log('=== 基础版本测试 ===');
const clone1 = deepClone1(obj1);
clone1.address.city = '上海';
console.log('原对象:', obj1.address.city);  // 北京 ✓
console.log('克隆对象:', clone1.address.city);  // 上海 ✓

// 测试循环引用（会栈溢出！）
// obj1.self = obj1;  // 取消注释会导致栈溢出
// deepClone1(obj1);  // Maximum call stack size exceeded


// ==================== 第二版：处理循环引用 ====================
function deepClone2(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 检查是否已经拷贝过（解决循环引用）
  if (map.has(obj)) {
    return map.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};

  // 存入 map，防止循环引用
  map.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone2(obj[key], map);
    }
  }

  return clone;
}

console.log('\n=== 循环引用测试 ===');
const obj2 = { name: '循环引用' };
obj2.self = obj2;  // 自我引用
const clone2 = deepClone2(obj2);
console.log('克隆成功:', clone2.name);  // 循环引用
console.log('self 指向克隆对象:', clone2.self === clone2);  // true ✓
console.log('self 不是原对象:', clone2.self !== obj2);  // true ✓


// ==================== 第三版：处理特殊对象 ====================
function deepClone3(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理特殊对象类型
  // Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // Map
  if (obj instanceof Map) {
    const mapClone = new Map();
    map.set(obj, mapClone);  // 先存入，防止循环引用
    obj.forEach((value, key) => {
      mapClone.set(deepClone3(key, map), deepClone3(value, map));
    });
    return mapClone;
  }

  // Set
  if (obj instanceof Set) {
    const setClone = new Set();
    map.set(obj, setClone);  // 先存入，防止循环引用
    obj.forEach(value => {
      setClone.add(deepClone3(value, map));
    });
    return setClone;
  }

  // 检查循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 处理普通对象和数组
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone3(obj[key], map);
    }
  }

  return clone;
}

console.log('\n=== 特殊对象测试 ===');
const obj3 = {
  date: new Date('2024-01-01'),
  regex: /hello/gi,
  map: new Map([['key1', 'value1'], ['key2', { nested: true }]]),
  set: new Set([1, 2, { a: 3 }])
};

const clone3 = deepClone3(obj3);
console.log('Date 类型:', clone3.date instanceof Date);  // true ✓
console.log('Date 值:', clone3.date.getTime() === obj3.date.getTime());  // true ✓
console.log('RegExp 类型:', clone3.regex instanceof RegExp);  // true ✓
console.log('RegExp 源:', clone3.regex.source === obj3.regex.source);  // true ✓
console.log('Map 类型:', clone3.map instanceof Map);  // true ✓
console.log('Map 值:', clone3.map.get('key1') === 'value1');  // true ✓
console.log('Set 类型:', clone3.set instanceof Set);  // true ✓
console.log('Set 大小:', clone3.set.size === 3);  // true ✓


// ==================== 完整版本：终极深拷贝 ====================
function deepClone(obj, map = new WeakMap()) {
  // 基本类型和 null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理特殊对象
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (obj instanceof Error) return new Error(obj.message);

  // 处理循环引用
  if (map.has(obj)) return map.get(obj);

  // 处理 Map
  if (obj instanceof Map) {
    const clone = new Map();
    map.set(obj, clone);
    obj.forEach((value, key) => {
      clone.set(deepClone(key, map), deepClone(value, map));
    });
    return clone;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const clone = new Set();
    map.set(obj, clone);
    obj.forEach(value => {
      clone.add(deepClone(value, map));
    });
    return clone;
  }

  // 处理普通对象和数组
  const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  map.set(obj, clone);

  // 处理 Symbol 键
  const symKeys = Object.getOwnPropertySymbols(obj);
  for (const symKey of symKeys) {
    clone[symKey] = deepClone(obj[symKey], map);
  }

  // 处理普通键
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }

  return clone;
}

console.log('\n=== 完整版本测试 ===');
const objComplete = {
  str: 'hello',
  num: 123,
  bool: true,
  nil: null,
  undef: undefined,
  date: new Date(),
  regex: /test/gi,
  arr: [1, [2, 3], { a: 4 }],
  map: new Map([['key', { value: 1 }]]),
  set: new Set([1, { b: 2 }]),
  nested: { deep: { deeper: { deepest: 'value' } } }
};

// 添加 Symbol 键
const sym = Symbol('test');
objComplete[sym] = 'symbol value';

const cloneComplete = deepClone(objComplete);

console.log('基本类型:', cloneComplete.str === 'hello' && cloneComplete.num === 123);
console.log('Date:', cloneComplete.date instanceof Date && cloneComplete.date !== objComplete.date);
console.log('RegExp:', cloneComplete.regex.source === 'test');
console.log('数组:', Array.isArray(cloneComplete.arr) && cloneComplete.arr !== objComplete.arr);
console.log('Map:', cloneComplete.map instanceof Map && cloneComplete.map !== objComplete.map);
console.log('Set:', cloneComplete.set instanceof Set && cloneComplete.set !== objComplete.set);
console.log('Symbol:', cloneComplete[sym] === 'symbol value');
console.log('深嵌套:', cloneComplete.nested.deep.deeper.deepest === 'value');

// 验证深拷贝（修改不影响原对象）
cloneComplete.nested.deep.deeper.deepest = 'changed';
console.log('深拷贝验证:', objComplete.nested.deep.deeper.deepest === 'value');  // true ✓


// ==================== 面试高频考点总结 ====================
/*
  深拷贝面试要点：
  1. 基本类型 vs 引用类型
  2. 循环引用处理（WeakMap）
  3. 特殊对象：Date、RegExp、Map、Set
  4. Symbol 键的处理
  5. 原型链的保留（Object.create）

  常见追问：
  - 为什么用 WeakMap 而不是 Map？（WeakMap 键是弱引用，不会内存泄漏）
  - 如何处理函数？（通常不拷贝，直接返回引用）
  - JSON.parse(JSON.stringify()) 的局限性？
    * 不能处理 undefined、函数、Symbol
    * 不能处理循环引用
    * 不能处理 Date、RegExp（会变成字符串）
    * 不能处理 Map、Set
*/