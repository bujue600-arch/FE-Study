//leetcode.cn/problems/valid-parentheses/description/

/**
 * @param {string} s
 * @return {boolean}
 */
https: var isValid = function (s) {
  const stack = [];
  const map = new Map();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");

  for (let i = 0; i < s.length; i++) {
    //是左括号就入栈
    if (map.has(s[i])) {
      stack.push(s[i]);
      //是右括号就去跟栈尾匹配
    } else {
      if (map.get(stack[stack.length - 1]) !== s[i]) {
        return false;
      } else {
        stack.pop();
      }
    }
  }

  return stack.length === 0;
};
