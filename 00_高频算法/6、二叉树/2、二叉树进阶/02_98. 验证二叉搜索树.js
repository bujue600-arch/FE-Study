var hasPathSum = function (root, targetSum) {
  if (root === null) {
    return false;
  }
  targetSum -= root.val;
  if (root.left === null && root.right === null) {
    // root 是叶子
    return targetSum === 0;
  }
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};
