https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
// 无重复字符的最长子串

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
  let map = new Map()
  for (let key in str) {
      map.set(str[key], key)
  }
  let arr = []
  map.forEach( v => { arr.push(parseInt(v)) })
  arr.sort()
  return arr.length
};