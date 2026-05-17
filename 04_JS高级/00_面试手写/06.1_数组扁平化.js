const flat = (arr) =>
  arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flat(cur) : cur),
    [],
  );

console.log(flat([1, [2, [3, [4, 5]]], 6]));
