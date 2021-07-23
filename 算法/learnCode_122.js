// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0];
  let profit = 0;
  let sumPro = 0;
  for(let i = 1, len = prices.length; i < len; i++) {
    if(prices[i] < min || profit > prices[i] - min) {
        min = prices[i]
        sumPro += profit
        profit = 0
    }else {
        profit = prices[i] - min
    }
  }
  sumPro += profit
  return sumPro
};