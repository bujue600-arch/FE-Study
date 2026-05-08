https://leetcode.cn/problems/merge-sorted-array/description/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
//一、简单做法，直接把 nums2 的元素放到 nums1 后面，然后排序（没用上题目给出的有序条件）
var merge1 = function (nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2)
    nums1.sort((a, b) => a - b)
};


//二、双指针法，从后往前比较，哪个大就放到 nums1 的末尾
var merge2 = function (nums1, m, nums2, n) {
    let p1 = m - 1
    let p2 = n - 1
    let tail = m + n - 1

    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[tail] = nums1[p1]
            p1--
        } else {
            nums1[tail] = nums2[p2]
            p2--
        }
        tail--
    }

    // 如果 nums2 还有剩余元素，直接放到 nums1 中
    while (p2 >= 0) {
        nums1[tail] = nums2[p2]
        p2--
        tail--
    }
};