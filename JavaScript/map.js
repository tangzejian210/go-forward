Array.prototype.map = function(fn, obj) {
  let arr = this
  if(!Array.isArray(arr)) {
    throw new ('this is no a Array')
  }
  if(Object.prototype.toString.call(fn) !== '[Object Function]') {
    throw new('this is no a Function')
  }
  let res = []
  for(let i = 0, len = arr.length; i < len; i++) {
    res.push(fn.call(obj, arr[i], i, arr))
  }
  return res
}