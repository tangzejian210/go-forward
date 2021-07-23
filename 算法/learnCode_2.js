// https://leetcode-cn.com/problems/add-two-numbers/submissions/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let sum = 0;
    let resNode = new ListNode()
    // 头部指针指向结果链表的第一个元素
    let head = resNode
    // 当l1或者l2有下一个链表元素的时候，继续循环执行
    while(l1 || l2) {
        if(l1) {
            // 使用sum累加当前l1指向链表元素的val值
            sum += l1.val
            // 修改l1指向的链表元素
            l1 = l1.next
        }
        if(l2) {
            sum += l2.val
            l2 = l2.next
        }
        if(sum >= 10) {
            // sum大于等于10的时候，当前结果链表元素的值为sum - 10，sum的值修改为1，作为下一个循环的起始值
            resNode.val = sum - 10
            sum = 1
        } else {
            // 当sum的值小于10的时候，当前结果链表元素的值为sum，sum重新初始化为0
            resNode.val = sum
            sum = 0
        }
        if(l1 || l2) {
            // 未结束循环的处理，初始化下一个结果链表的元素，改变resNode的指向。
            resNode.next = new ListNode() 
            resNode = resNode.next
        } else if(sum !== 0) {
            // 此处应是结束循环前处理sum的值，因为sum的值有可能大于0，是上一次循环剩下的值
            resNode.next = new ListNode(sum)
        }
    }
    return head
  };