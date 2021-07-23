// 防抖函数
// 触发清除定时器，重新生成新的定时器
function debounce (fun, wait) {
  let timeOut = null
  return function () {
    let self = this
    let arg = arguments
    if (timeOut) clearTimeout(timeOut)
    timeOut = setTimeout( () => {
      clearTimeout(timeOut)
      fun.apply(self, arg)
    }, wait)
  }
}