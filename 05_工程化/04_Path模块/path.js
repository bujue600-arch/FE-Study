const path = require("path")

// 获取当前文件的父文件夹
console.log(path.dirname(__filename))

// 获取当前文件的扩展名
console.log(path.extname(__filename))

// 获取当前文件的文件名
console.log(path.basename(__filename))

// 拼接路径
console.log(path.join(__dirname, "test", "index.html"))

//拼接绝对路径
console.log(path.resolve("/04_Path模块", "../test", "./index.html"))

