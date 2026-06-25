const path = require("path");

console.log(path.basename("C:\\temp\\myfile.html"));

// 在 Windows 系统中，路径使用反斜杠（\）作为路径分隔符。
// 这与 POSIX 系统使用的正斜杠（/）是不同的。
// 这是 Windows 系统的历史原因所致，早期的 Windows 操作系统采用了不同的设计选择。
console.log(path.posix.basename("/aaaa/bbbb/cccc/index.html"));
