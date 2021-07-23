String.prototype.split = function() {
  if(Object.prototype.toString.call(this) !== '[object String]') {
    throw new TypeError('this is no a string')
  }
  let str = this
  let arg = Array.from(arguments)
  let res = []
  if (arg.length <= 0) return res.push(str)
  let key = arg[0]
  for(let i of str) {
    if(key !== i){
      res.push(i)
    }
  }
  return res
}