//一、字符串类型
//普通声明
let a: string = "123";
//也可以使用es6的字符串模板
let str: string = `dddd${a}`;

//二、数字类型
let notANumber: number = NaN; //NaN
let num: number = 123; //普通数字
let infinityNumber: number = Infinity; //无穷大
let decimal: number = 6; //十进制
let hex: number = 0xf00d; //十六进制
let binary: number = 0b1010; //二进制
let octal: number = 0o744; //八进制

//三、布尔类型
//let createdBoolean: boolean = new Boolean(1)
//这样会报错 因为事实上 new Boolean() 返回的是一个 Boolean 对象
let createdBoolean: Boolean = new Boolean(1);
let booleand: boolean = true; //可以直接使用布尔值
let booleand2: boolean = Boolean(1); //也可以通过函数返回布尔值

//四、null和undefined
let un: undefined = undefined;
let n: null = null;
