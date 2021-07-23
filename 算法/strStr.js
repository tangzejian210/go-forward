https://leetcode-cn.com/problems/implement-strstr/
// 实现 strStr()
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
let strStr = function(hayStack, needls) {
  if (hayStack.length <= 0) return -1
  if (needls.length > hayStack.length || needls.length == 0) return 0
  for(let i in hayStack) {
    i = parseInt(i)
    if(hayStack[i] === needls[0] && hayStack.slice(i, needls.length + i) === needls) {
      return i
    }
  }
  return -1
}