const remove = (arr) => {
  const set = new Set(arr);
  return Array.from(set);
};

console.log(remove([1, 1]));
