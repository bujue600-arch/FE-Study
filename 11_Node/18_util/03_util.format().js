//类似于printf()：util.format(format, [args])

const util = require("util");

// 1、foo-----bar xm/zs  可以返回指定的格式
console.log(util.format("%s-----%s %s/%s", "foo", "bar", "xm", "zs"));

// 2、如果不传入格式化参数 就按空格分开
console.log(util.format(1, 2, 3));
