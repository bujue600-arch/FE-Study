// 1、包密码存储数据库
// 2、数据完整性校验

const crypto = require("node:crypto");

// 要计算哈希的数据
let text = "123456";

// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash("md5");

// 更新哈希对象的数据
hash.update(text);

// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest("hex");

console.log("Text:", text);
console.log("Hash:", hashValue);
