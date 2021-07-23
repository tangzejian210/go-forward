// 辅助函数
Object.prototype.isObject = function() {
  return (typeof this === 'object' || typeof this === 'function') && this !== null
}

// 普通版本
Object.prototype.deepCopy = function() {
  if(typeof this !== 'object' || this === null) {
    throw new TypeError("this is no a object")
  }
  let obj = this
  let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy.call(obj[key]) : obj[key]
    }
  }
  return newObj
}

// 解决循环引用
Object.prototype.deepCopy = function(map = new WeakMap()) {
  if(map.get(this)) {
    return this
  }
  let obj = this
  if(this.isObject()) {
    map.set(obj, true)
    let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy.call(obj[key], map)
      }
    }
    return newObj
  } else {
    return obj
  }
}