//使用可读流读取 使用场景适合读取大文件

import fs from "node:fs";

const readStream = fs.createReadStream("./index.txt", {
  encoding: "utf8",
});

readStream.on("data", (chunk) => {
  console.log(chunk);
});

readStream.on("end", () => {
  console.log("close");
});
