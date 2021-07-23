https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/

// 使用递归，超出了时间限制
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if(n < 2) return n
  return fib(n - 1) + fib(n - 2) 
};

var fib = function(n) {
  if(n === 0) return 0
  if(n === 1) return 1
  let res = 0
  let a = 0
  let b = 1
  for(let i = 2; i <= n; i++) {
    res = a + b
    a = b
    b = res % 1000000007
  }
  return res % 1000000007
}