const os = require("os");

// 1、获取操作系统信息
// console.log(os.platform()); //win32
// console.log(os.release()); //10.0.26200
// console.log(os.type()); //Windows_NT
// console.log(os.version()); //Windows 11 Home China
// console.log(os.arch()); //x64
// console.log(os.homedir()); //C:\Users\WangH

// 2、获取CPU信息
// console.log(os.cpus());
// console.log(os.cpus().length);

// 3、获取网络信息
// console.log(os.networkInterfaces());

// 4、获取内存信息
// console.log(os.freemem());
// console.log(os.totalmem());

// 小例子
// const { exec } = require("child_process");

// const open = (url) => {
//   exec(`start ${url}`);
// };

// open("https://www.google.com");
