import fs from "node:fs";

//创建文件夹
fs.mkdir("path/test/ccc", { recursive: true }, (err) => {});

//删除文件夹
fs.rm("path", { recursive: true }, (err) => {});

//重命名文件
fs.renameSync("./test.txt", "./test2.txt");

//监听文件变化
fs.watch("./test2.txt", (event, filename) => {
  console.log(event, filename);
});
