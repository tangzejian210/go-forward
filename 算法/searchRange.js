https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
// 在排序数组中查找元素的第一个和最后一个位置
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let arr = []
  for(let i = 0, len = nums.length; i < len; i++) {
      if(nums[i] === target && arr.length < 2) arr.push(i)
      else if (nums[i] === target && arr.length === 2) arr[1] = i
  }
  if(arr.length === 2) return arr
  else if(arr.length === 1) { arr.push(arr[0]); return arr }
  else return [-1,-1]
};