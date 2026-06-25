const path = require("path");
// 用于将相对路径解析并且返回绝对路径

// 1、如果传入了多个绝对路径 它将返回最右边的绝对路径
console.log(
  path.resolve("/aaaa/bbbb/cccc/index.html", "/dddd/eeee/ffff/index.html"),
);

// 2、传入绝对路径 + 相对路径
console.log(path.resolve(__dirname, "./index.js"));

// 3、传入相对路径 + 相对路径 返回工作目录 + index.js
console.log(path.resolve("./index.js"));
