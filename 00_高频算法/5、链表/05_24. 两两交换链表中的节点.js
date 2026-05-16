//leetcode.cn/problems/swap-nodes-in-pairs/description/

https: var swapPairs = function (head) {
  const dummy = new ListNode(0, head); // 用哨兵节点简化代码逻辑
  let node0 = dummy;
  let node1 = head;
  while (node1 && node1.next) {
    // 至少有两个节点
    const node2 = node1.next;
    const node3 = node2.next;

    node0.next = node2; // 0 -> 2
    node2.next = node1; // 2 -> 1
    node1.next = node3; // 1 -> 3

    node0 = node1; // 下一轮交换，0 是 1
    node1 = node3; // 下一轮交换，1 是 3
  }
  return dummy.next; // 返回新链表的头节点
};
