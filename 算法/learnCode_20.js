// https://leetcode-cn.com/problems/valid-parentheses/
// 20. 有效的括号

/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
  let resArr = []
  let res_len = resArr.length
  let map = new Map([['(',')'],['[',']'],['{','}']])
  for(let i = 0, len = s.length; i < len; i++) {
      res_len = resArr.length
      if(res_len > 0 && map.get(resArr[res_len - 1]) === s[i]) { // 当前括号与上一个resArr的最后一个括号对比是否匹配成对
          // 成对的话，就删除resArr数组的最后一个括号。
          resArr.pop()
      } else {
          // 不成对，把括号加入resArr数组中。
          resArr.push(s[i])
      }
  }
  return resArr.length > 0 ? false : true
};