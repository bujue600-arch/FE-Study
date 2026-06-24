//给常用的几个固定选项起个名字

enum Enum {
  fall,
}

let ab = Enum.fall;
console.log(ab); //0
let nameOfA = Enum[ab];
console.log(nameOfA); //fall
