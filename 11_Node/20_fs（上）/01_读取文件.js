import fs from "fs";
import fs2 from "fs/promises";

// 1、同步读取文件
let txt = fs.readFileSync("./index.txt");
console.log(txt.toString());

// 2、异步读取文件
fs2.readFile("./index.txt").then((result) => {
  console.log(result.toString());
});

// 3、promise读取文件
fs.readFile("./index.txt", (err, data) => {
  if (err) {
    return err;
  }
  console.log(data.toString());
});
