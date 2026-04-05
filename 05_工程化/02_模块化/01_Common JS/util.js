const add = (a, b) => {
  return a + b;
}

const subtract = (a, b) => {
  return a - b;
}

//导出写法 A: 修改 module.exports 对象
module.exports = {
  add,
  subtract
}

//导出写法 B: 直接挂载在exports对象上
// exports.add = add;
// exports.subtract = subtract;
