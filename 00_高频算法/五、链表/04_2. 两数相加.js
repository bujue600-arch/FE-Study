//leetcode.cn/problems/add-two-numbers/description/

// l1 和 l2 为当前遍历的节点，carry 为进位
https: var addTwoNumbers = function (l1, l2, carry = 0) {
  if (l1 === null && l2 === null && carry === 0) {
    // 递归边界
    return null;
  }

  let s = carry;
  if (l1) {
    s += l1.val; // 累加进位与节点值
    l1 = l1.next;
  }
  if (l2) {
    s += l2.val;
    l2 = l2.next;
  }

  // s 除以 10 的余数为当前节点值，商为进位
  return new ListNode(s % 10, addTwoNumbers(l1, l2, Math.floor(s / 10)));
};
