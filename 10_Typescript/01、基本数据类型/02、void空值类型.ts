function voidFn(): void {
  console.log("test void");
}

let u: void = undefined;
//如果tsconfig.json配置了严格模式，null不能赋予void 类型
// let n: void = null;
