Object.create = function(obj) {
  let fn = function () {}
  fn._proto_ = obj
  return new fn()
}

let obj = { a: 123 }
let test = Object.create(obj)
console.log(test)