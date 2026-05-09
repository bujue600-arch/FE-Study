//leetcode.cn/problems/two-sum/description/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
https: var twoSum = function (nums, target) {
  const map = new Map();

  for (let right = 0; right < nums.length; right++) {
    if (map.has(target - nums[right])) {
      return [map.get(target - nums[right]), right];
    } else {
      map.set(nums[right], right);
    }
  }
};
