Function.prototype.call = function(){
  let org = []
  for(let i of arguments) {
    org.push(i)
  }
  let obj = org.shift()
  obj = obj || window
  obj.fn = this
  obj.fn(org.join(","))
  delete obj.fn
}

Function.prototype.call = function(){
  let obj = [].shift.call(arguments)
  obj = obj || window
  obj.fn = this
  obj.fn(...arguments)
  delete obj.fn
}