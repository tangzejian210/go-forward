Array.prototype.reduce = function(fn, sum) {
  let arr = this
  if(Object.prototype.toString.call(arr) !== "[Object Array]") {
    throw new TypeError('this is no a Array')
  }
  if(Object.prototype.toString.call(fn) !== "[Object Function]") {
    throw new TypeError('this is no a Function')
  }
  sum = sum === undefined ? 0 : sum
  for(let i = 0, len = arr.length; i < len; i++) {
    sum = fn(sum, arr[i], arr)
  }
  return sum
}