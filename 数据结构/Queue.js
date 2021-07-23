// 队列，先进先出
// 单向队列
class Queue{
  constructor(){
    this.obj = {}
    this.index = 0
    this.len = 0
  }
  size() {
    return this.len - this.index
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.obj = {}
    this.index = 0
    this.len = 0
  }
  enqueue(e) {
    this.obj[this.len] = e
    this.len++
  }
  dequeue() {
    if(this.isEmpty()) return undefined 
    let val = this.obj[this.index]
    delete this.obj[this.index]
    this.index++
    return val
  }
  peek() {
    if(this.isEmpty()) return undefined
    return this.obj[this.len - 1] 
  }
}

var queue = new Queue()
queue.enqueue(1)
queue.enqueue(3)
queue.enqueue(5)
queue.enqueue(7)
console.log(queue.peek())
console.log(queue.dequeue())
console.log(queue)


// 双向队列
class Queue{
  constructor(){
    this.obj = {}
    this.index = 0
    this.len = 0
  }
  size() {
    return this.len - this.index
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.obj = {}
    this.index = 0
    this.len = 0
  }
  // 头部操作
  enqueue_head(e) {
    // 分成两种情况
    // 第一种是index > 0，比较简单
    if(this.index > 0) {
      this.index--
      this.obj[this.index] = e
    } else {
    // 第二种是index <= 0，比较复杂，需要向后移动一个位置
      for(let i = this.len; i > 0; i--) {
        this.obj[i] = this.obj[i - 1]
      }
      this.obj[0] = e
      this.len++
    }
  }
  dequeue_head() {
    if(this.isEmpty()) return undefined 
    let val = this.obj[this.index]
    delete this.obj[this.index]
    this.index++
    return val
  }
  peek_head() {
    if(this.isEmpty()) return undefined
    return this.obj[this.index] 
  }
  // 尾部操作
  enqueue_tail(e) {
    this.obj[this.len] = e
    this.len++
  }
  dequeue_tail() {
    if(this.isEmpty()) return undefined 
    this.len--
    var val = this.obj[this.len]
    delete this.obj[this.len]
    return val
  }
  peek_tail() {
    if(this.isEmpty()) return undefined
    return this.obj[this.len - 1] 
  }
}

var queue = new Queue()
queue.enqueue_tail(3)
queue.enqueue_tail(5)
console.log(queue)

queue.enqueue_head(1)
console.log(queue)

queue.enqueue_tail(7)
queue.dequeue_head()
console.log(queue)

queue.dequeue_tail()
console.log(queue)