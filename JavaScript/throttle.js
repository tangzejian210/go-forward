// 节流函数
function throttle(fun, wait) {
  let timeOut = null
  return function() {
    let self = this
    let arg = arguments
    if(timeOut) return
    timeOut = setTimeout( ()=> {
      clearTimeout(timeOut)
      timeOut = null
      fun.apply(self, arg)
    }, wait)
  }
}