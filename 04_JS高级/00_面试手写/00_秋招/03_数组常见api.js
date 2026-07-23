//数组去重
const arr = [5, 1, 2, 3, 2, 3, 4, 5, 6];
const arr1 = [...new Set(arr)];
const arr2 = arr.filter((v, i) => arr.indexOf(v) === i);
console.log(arr2);

//数组扁平化 flat
const flat1 = (arr) => {
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flat1(cur) : cur),
    [],
  );
};
const arr3 = [
  [1, 2, 3],
  [2, 3, 4, [4, 5, 6, [6, 7, [8, 9]]]],
];
console.log(flat1(arr3));

//数组映射 map
Array.prototype.myMap = function (fn) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr[i] = fn(this[i]);
  }
  return newArr;
};

const arr4 = arr.myMap((num) => num * 2);
console.log(arr4);

//数组筛选 filter
Array.prototype.myFilter = function (fn) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) newArr.push(this[i]);
  }
  return newArr;
};

const arr5 = arr.myFilter((n) => n % 2 === 0);
console.log(arr5);

//数组归约 reduce
Array.prototype.myReduce = function (fn, init) {
  let res = init === undefined ? this[0] : init;
  let start = init === undefined ? 1 : 0;
  for (let i = start; i < this.length; i++) {
    res = fn(res, this[i]);
  }
  return res;
};

const arr6 = arr.myReduce((acc, cur) => (acc += cur), 2);
console.log(arr6);
