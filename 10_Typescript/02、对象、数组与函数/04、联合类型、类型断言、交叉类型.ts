//怎么表达“既是 A 又是 B”或“强行认定它是 A”

//联合类型
const fn1 = (something: number | boolean): boolean => {
  return !!something;
};

//交叉类型
interface People {
  age: number;
  height: number;
}
interface Man {
  sex: string;
}
const xiaoman = (man: People & Man) => {
  console.log(man.age);
  console.log(man.height);
  console.log(man.sex);
};
xiaoman({ age: 18, height: 180, sex: "male" });

//类型断言
interface A2 {
  run: string;
}

interface B {
  build: string;
}

const fn2 = (type: A2 | B): string => {
  return (type as A2).run;
};
//可以使用类型断言来推断他传入的是A接口的值
