// 核心逻辑：
// 指针 cur 指向根，一直往左走，路径上的点全部入栈。
// 当 cur 为空，说明左边到头了，从栈中弹出一个节点（即当前子树的根）。
// 处理该节点后，将 cur 指向该节点的右子树。

function inorderTraversal(root) {
  let res = [],
    stack = [],
    cur = root;
  while (cur || stack.length) {
    while (cur) {
      // 一路向左
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right; // 转到右子树
  }
  return res;
}

//
