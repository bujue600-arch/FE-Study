import fs from "node:fs";

fs.linkSync("./index.txt", "./index2.txt"); //硬链接

fs.symlinkSync("./index.txt", "./index3.txt", "file"); //软连接 管理员权限
