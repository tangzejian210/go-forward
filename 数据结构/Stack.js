// 栈，后进先出
// Array
class stack_arr {
  constructor() {
    this.arr = []
  } 
  clear() {
    this.arr = []
  }
  size() {
    return this.arr.length
  }
  isEmpty() {
    return this.size() === 0
  }
  push(e) {
    this.arr.push(e)
  }
  pop() {
    if(!this.isEmpty()) return this.arr.pop()
    else return undefined
  }
  peek() {
    if(!this.isEmpty()) return this.arr[this.size() - 1]
    else return undefined
  }
}

// Object
class stack_obj {
  constructor() {
    this.obj = {}
    this.len = 0
  }
  clear() {
    this.obj = {}
  }
  size() {
    return this.len
  }
  isEmpty() {
    return this.size() === 0
  }
  push(e) {
    this.obj[this.len] = e
    this.len++
  }
  pop() {
    if(!this.isEmpty()) {
      this.len--
      return this.obj[this.len]
    }
    else return undefined
  }
  peek() {
    if(!this.isEmpty()) return this.obj[this.size() - 1]
    else return undefined
  }
}

let stack_test = new stack_obj()

stack_test.push(1)
stack_test.push(3)
stack_test.push(5)
stack_test.push(7)

console.log(stack_test)
console.log(stack_test.pop())
console.log(stack_test.size())