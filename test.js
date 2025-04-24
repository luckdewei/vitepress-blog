/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 迭代
var reverseList = function(head) {
  if (head == null || head.next == null) {
    return head;
  }
  let prev = null;
  let curr = head;
  while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
  }
  return prev;
};

// 递归
var reverseList = function(head) {
  if (head == null || head.next == null) {
      return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}