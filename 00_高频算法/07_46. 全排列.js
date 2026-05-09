//leetcode.cn/problems/permutations/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
https: var permute = function (nums) {
  const res = [];
  const used = new Array(nums.length).fill(false);

  function back(path) {
    if (path.length === nums.length) {
      res.push([...path]);
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      path.push(nums[i]);
      used[i] = true;

      back(path);

      path.pop(nums[i]);
      used[i] = false;
    }
  }

  back([]);
  return res;
};
