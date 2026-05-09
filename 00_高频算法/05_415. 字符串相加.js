//leetcode.cn/problems/add-strings/description/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
https: var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  const res = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    // 使用 i 和 j 分别从 num1 和 num2 取值
    let n1 = i >= 0 ? parseInt(num1[i]) : 0;
    let n2 = j >= 0 ? parseInt(num2[j]) : 0; // 修改点：使用 num2[j]

    let sum = n1 + n2 + carry;
    res.push(sum % 10); // 使用 push 性能更好
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  // 最后反转数组并转为字符串
  return res.reverse().join("");
};
