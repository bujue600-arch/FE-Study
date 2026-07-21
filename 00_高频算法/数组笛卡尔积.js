const foo = (input) => {
  const res = [];
  const track = [];

  const backtrack = (start) => {
    if (track.length === input.length) {
      res.push([...track]);
      return;
    }

    for (let i = start; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        track.push(input[i][j]);
        backtrack(i + 1);
        track.pop();
      }
    }
  };
  backtrack(0);
  return res;
};

const input = [
  ["红色", "蓝色"],
  ["S", "M"],
  ["有袖", "无袖"],
];
console.log(foo(input));
