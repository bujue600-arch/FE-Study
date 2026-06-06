//非空断言运算符 !
let str: string | null = "";
let l = str!.length; // Error: Object is possibly 'null'.
console.log(l);

//可选链运算符 ?.
interface Person {
  name: string;
  age: number;
  address?: {
    city: string;
    country: string;
  };
}
const person: Person = {
  name: "Alice",
  age: 30,
};
console.log(person.address?.city); // undefined

//空值合并运算符 ??
let value: string | null = null;
let result = value ?? "default value";
console.log(result); // "default value"
