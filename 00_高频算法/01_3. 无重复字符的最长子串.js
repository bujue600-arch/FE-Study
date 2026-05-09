//leetcode.cn/problems/longest-substring-without-repeating-characters/description/

/**
 * @param {string} s
 * @return {number}
 */
https: var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let MaxLength = 0;
  const map = new Map();

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      //如果上次重复位置已经在窗口左侧之外，那就保持当前 left
      left = Math.max(map.get(s[right]) + 1, left);
    }
    map.set(s[right], right);
    MaxLength = Math.max(right - left + 1, MaxLength);
  }
  return MaxLength;
};

const s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));
