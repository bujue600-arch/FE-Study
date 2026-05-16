//leetcode.cn/problems/decode-string/description/

/**
 * @param {string} s
 * @return {string}
 */
https: var decodeString = function (s) {
  const numStack = [];
  const strStack = [];
  let num = 0;
  let res = "";

  for (let char of s) {
    if (!isNaN(char)) {
      //是数字
      num = num * 10 + Number(char);
    } else if (char === "[") {
      //左括号入栈
      numStack.push(num);
      num = 0;
      strStack.push(res);
      res = "";
    } else if (char === "]") {
      //右括号出栈
      let repeatTimes = numStack.pop();
      res = strStack.pop() + res.repeat(repeatTimes);
    } else {
      res += char;
    }
  }
  return res;
};
