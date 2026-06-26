import fs from "node:fs";

// 第一种方式 设置flag 为 a 也可以追内容
fs.writeFileSync("index.txt", "\nvue之父\n鱿鱼须", {
  flag: "a",
});

// 第二种方式 追内容
fs.appendFileSync("index.txt", "\nvue之父\n鱿鱼须");
