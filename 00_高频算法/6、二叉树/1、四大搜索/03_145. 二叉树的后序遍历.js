//leetcode.cn/problems/binary-tree-postorder-traversal/description/

https: function postorderTraversal(root) {
  if (!root) return [];
  let stack = [root],
    res = [];
  while (stack.length) {
    let node = stack.pop();
    res.push(node.val);
    // 关键点：原本前序是先右后左，这里改为先左后右
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return res.reverse(); // 最后把结果反转
}
