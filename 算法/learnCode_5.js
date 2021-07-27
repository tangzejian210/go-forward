// https://leetcode-cn.com/problems/longest-palindromic-substring/
// 5. 最长回文子串
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let res = ''
  if(s.length < 2) return s
  for(let i = 0; i < s.length; i++) {
      // 回文子串是奇数
      helper(i, i)
      // 回文子串是奇数
      helper(i, i + 1)
  }
  function helper (m, n){
      while(m >=0 && n < s.length && s[m] === s[n]) {
          m--;
          n++;
      }
      if(n - m - 1 > res.length) {
          res = s.slice(m + 1, n)
      }
  }
  return res
};