// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
// 3. 无重复字符的最长子串

// 当查找到相同字符，重新计算最新无重复字符串str，但是str并不一定是最长的。
// 只有当前的最新无重复字符串str长度大于max_len，max_len才会重新计算。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  // 无重复字符串最大长度
  let max_len = 0
  // 最新无重复字符串(并不一定是最长的)
  let str = ''
  for(let i = 0, len = s.length; i < len; i++) {
      if(str.includes(s[i])) { // 当查找相同字符时
          // 判断需不需要重新计算max_len
          if(str.length > max_len) max_len = str.length
          // 根据相同字符的位置重新计算str
          str = str.slice(str.indexOf(s[i]) + 1) + s[i]
      } else {
          str = str + s[i]
      }
  }
  if(str.length > max_len) max_len = str.length
  return max_len
};