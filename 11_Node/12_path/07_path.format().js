const path = require("path");

console.log(
  path.format({
    root: "/",
    dir: "/home/user/documents",
    base: "file.txt",
    ext: ".txt",
    name: "file",
  }),
);
// /home/user/dir/file.txt
