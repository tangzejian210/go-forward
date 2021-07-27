/**
 * @param {string} s
 * @return {number}
 */
 var longestValidParentheses = function(s) {
  let resArr = []
  let res_len = resArr.length
  for(let i = 0, len = s.length; i < len; i++) {
      res_len = resArr.length
      if(res_len > 0 && resArr[res_len - 1] === s[i]) { // 当前括号与上一个resArr的最后一个括号对比是否匹配成对
          // 成对的话，就删除resArr数组的最后一个括号。
          resArr.pop()
      } 
      resArr.push(s[i])
  }
  return resArr.length
};