const symbol1 = Symbol("666");
const symbol2 = Symbol("777");
const obj1 = {
  [symbol1]: "小满",
  [symbol2]: "二蛋",
  age: 19,
  sex: "女",
};
// 1 for in 遍历
for (const key in obj1) {
  // 注意在console看key,是不是没有遍历到symbol1
  console.log(key);
}
// 2 Object.keys 遍历
Object.keys(obj1);
console.log(Object.keys(obj1));
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1));
// 4 JSON.stringfy
console.log(JSON.stringify(obj1));
