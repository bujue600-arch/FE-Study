//leetcode.cn/problems/binary-tree-preorder-traversal/

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
 * @return {number[]}
 */

//一、迭代法：
https: var preorderTraversal = function (root) {
  if (!root) return [];
  const stack = [root],
    res = [];

  while (stack.length) {
    let node = stack.pop();
    res.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
};

//二、递归法：
function preorderTraversal(root) {
  const res = [];
  function dfs(node) {
    if (!node) return;
    res.push(node.val); // 根
    dfs(node.left); // 左
    dfs(node.right); // 右
  }
  dfs(root);
  return res;
}
