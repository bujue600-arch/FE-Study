// https://leetcode.cn/problems/binary-tree-level-order-traversal/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root],
    res = [];

  while (queue.length) {
    let currentArray = [];
    let currentSize = queue.length;
    for (let i = 0; i < currentSize; i++) {
      let cur = queue.shift();
      currentArray.push(cur.val);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    res.push(currentArray);
  }
  return res;
};
