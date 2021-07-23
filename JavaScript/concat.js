Array.prototype.concat = function(otherArr) {
  if(Object.prototype.toString.call(this) !== '[object Array]') {
    throw new TypeError('this is no a Array')
  }
  if(otherArr.constructor !== Array) {
    throw new TypeError('this is no a Array')
  }
  return [...this, ...otherArr]
}