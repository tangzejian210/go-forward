Array.prototype.shallowCopy = function() {
  if(typeof this === 'object' && this !== null) {
    throw new TypeError("this is no a Object")
  }
  let arr = this
  let newArr = Array.isArray(arr) ? [] : {}
  for(let i in arr) {
    if(arr.hasOwnProperty(i)) {
      newArr[i] = arr[i]
    }
  }
  return newArr
}