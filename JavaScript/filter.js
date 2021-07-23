Array.prototype.filter = function(fn) {
  let arr = this
  if(Object.prototype.toString.call(arr) !== '[Object Array]') {
    throw new('this is no a Array')
  }
  if(Object.prototype.toString.call(fn) !== '[Object Function]') {
    throw new('this is no a Function')
  }
  let res = []
  for(let i = 0, len = arr.length; i < len; i++){
    if(fn(arr[i])) res.push(arr[i])
  }
  return res
}