// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0]
  let max = min
  let profit = 0;
  for(let i = 0, len = prices.length; i < len; i++) {
      if(prices[i] < min) {
          min = prices[i]
          max = min
      } 
      if(max < prices[i]) {
          max = prices[i]
          let newProfit = max - min
          profit = newProfit > profit ? newProfit : profit
      }
  }
  return profit
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0]
  let profit = 0;
  for(let i = 0, len = prices.length; i < len; i++) {
      if(prices[i] < min) {
          min = prices[i]
      } else {
          profit = prices[i] - min > profit ? prices[i] - min : profit
      }
  }
  return profit
};