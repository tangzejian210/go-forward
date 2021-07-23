Function.prototype.apply2 = function(){
  let org = []
  for(let i of arguments) {
    org.push(i)
  }
  let obj = org.shift()
  obj = obj || window
  obj.fn = this
  obj.fn(org[0])
  delete obj.fn
}
