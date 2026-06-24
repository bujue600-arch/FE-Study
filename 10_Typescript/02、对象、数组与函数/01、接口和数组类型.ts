//用 Interface 给对象画一张“标准图纸”

//重名interface  可以合并
interface A1 {
  name: string;
}
interface A1 {
  age: number;
}
var x: A1 = { name: "xx", age: 20 };
//继承
interface A1 {
  name: string;
}

interface B1 extends A1 {
  age: number;
}

let obj: B1 = {
  age: 18,
  name: "string",
};

//可选属性、只读属性、任意属性
interface Person {
  b?: string;
  readonly a: string;
  [propName: string]: any;
  cb: () => void;
}

const person: Person = {
  a: "213",
  c: "123",
  cb: () => {
    console.log(123);
  },
};
