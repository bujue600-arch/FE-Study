//leetcode.cn/problems/reverse-linked-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
https: var reverseList = function (head) {
  let pre = null,
    cur = head;

  while (cur) {
    nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }

  return pre;
};
