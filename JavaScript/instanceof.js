function myInstanceof(obj, fn) {
  if(typeof fn !== 'function') throw new TypeError("Right-hand side of 'instanceof' is no a object")
  if(typeof fn !== 'function' && (typeof obj !== 'object' || obj === null)) return false
  let prototype = Object.getPrototypeOf(obj)
  while(prototype) {
    if(prototype.constructor === fn) return true
    prototype = Object.getPrototypeOf(prototype)
  }
  return false
}