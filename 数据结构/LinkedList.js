class Node {
  constructor(e) {
    this.e = e
    this.next = undefined
  }
}

function defaultEquals(a, b) {
  return a === b
}

// 单向链表
class LinkedList {
  constructor( equalsFn = defaultEquals) {
    this.head = undefined
    this.count = 0
    this.equalsFn = equalsFn
  }
  size() {
    return this.count
  }
  isEmpty() {
    return this.size() === 0
  }
  // 插入节点
  push(e) {
    this.insertEleAt(e)
  }
  // 获取指定节点
  getEleAt(index) {
    if(index < 0 || index >= this.size()) return undefined
    let p = 0
    let node = this.head
    while( p < index){
      node = node.next
      p++
    }
    return node
  }
  // 查找节点在链表的位置
  seachEle(e) {
    let p = 0
    let node = this.head
    while(!this.equalsFn(node.e, e)) {
      node = node.next
      if(!node) {
        return -1
      }
      p++
    }
    return p
  }
  // 插入节点
  push(e) {
    this.insertEleAt(e)
  }
  // 插入指定位置节点
  insertEleAt(e, index) {
    if(index === undefined) index = this.count
    if(index < 0 || index > this.size()) return undefined
    let new_node = new Node(e)
    if(index === 0) {
      new_node.next = this.head
      this.head = new_node
    } else {
      let pre_node = this.getEleAt(index - 1)
      if(pre_node.next) {
        new_node.next = pre_node.next
        pre_node.next = new_node
      } else {
        pre_node.next = new_node
      }
    }
    this.count++
  }
  // 删除值为e的节点
  deleteEle(e) {
    this.deleteEleAt(this.seachEle(e))
  }
  // 删除指定节点
  deleteEleAt(index) {
    if(index >= this.size() || index < 0) return undefined
    if(index === 0) {
      this.head = this.head.next
    } else if(index > 0 ) {
      let pre_node = this.getEleAt(index - 1)
      pre_node.next = pre_node.next.next
    }
    this.count--
  }
}

let linked = new LinkedList()
linked.push(1) // [1]
linked.push(3) // [1, 3]
console.log(linked)
linked.insertEleAt(7) // [1, 3, 7]
console.log(linked.head)
linked.insertEleAt(5, 2) // [1, 3, 5, 7]
console.log(linked.getEleAt(3))
// console.log(linked.head)
// linked.deleteEleAt(1) // [1, 5, 7]
// console.log(linked.head)
// console.log(linked.seachEle(9))
// console.log(linked.deleteEle(5)) // [1, 7]
// console.log(linked)


// 双向链表
class LinkedList {
  constructor( equalsFn = defaultEquals) {
    this.head = undefined
    this.count = 0
    this.equalsFn = equalsFn
  }
  size() {
    return this.count
  }
  isEmpty() {
    return this.size() === 0
  }
   // 获取指定节点
  getEleAt(index) {
    if(index < 0 || index >= this.size()) return undefined
    let p = 0
    let node = this.head
    while( p < index){
      node = node.next
      p++
    }
    return node
  }
  // 查找节点在链表的位置
  seachEle(e) {
    let p = 0
    let node = this.head
    while(!this.equalsFn(node.e, e)) {
      node = node.next
      if(p >= this.size()) return -1
      p++
    }
    return p
  }
  // 插入节点
  push(e) {
    this.insertEleAt(e)
  }
  // 插入指定位置节点
  insertEleAt(e, index) {
    if(index === undefined) index = this.count
    if(index < 0 || index > this.size()) return undefined
    let new_node = new Node(e)
    if(index === 0 && this.size() > 0) {
      let last_node = this.getEleAt(this.size() - 1)
      new_node.next = this.head
      this.head = new_node
      last_node.next = this.head
    } else if(index === 0 && this.size() === 0) {
      this.head = new_node
      new_node.next = this.head
    } else {
      let pre_node = this.getEleAt(index - 1)
      new_node.next = pre_node.next
      pre_node.next = new_node
    }
    this.count++
  }
  // 删除值为e的节点
  deleteEle(e) {
    this.deleteEleAt(this.seachEle(e))
  }
  // 删除指定节点
  deleteEleAt(index) {
    if(index >= this.size() || index < 0) return undefined
    if(index === 0 && this.size() > 1) {
      let last_node = this.getEleAt(this.size() - 1)
      this.head = this.head.next
      last_node.next = this.head
    } else if(index === 0 && this.size() === 1) {
      this.head.next = undefined
      this.head = undefined
    } else if(index > 0 ) {
      let pre_node = this.getEleAt(index - 1)
      pre_node.next = pre_node.next.next
    }
    this.count--
  }
}