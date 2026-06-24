//偷懒不写类型让系统猜，或者给长类型起个外号

type str = () => string;

let s: str = () => "我是小满";

console.log(s);
