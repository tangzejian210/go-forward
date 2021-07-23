// 二叉搜索树（BST）
class Node {
  constructor(key) {
    this.key = key
    this.l = null
    this.r = null
  }
}

const compare = {
  LESS: 0, // 小于
  BIGGER: 1 // 大于
}

function defaultCompareFn(a, b) {
  return a > b ? compare.BIGGER : compare.LESS
}

class BST {
  constructor(compareFn = defaultCompareFn) {
    this.compareFn = compareFn
    this.root = null
  }
  // 搜索节点
  search(key) {
    this.searchNode(this.root, key)
  }
  // 搜索节点
  searchNode(node, key) {
    if(!node) return false
    if(this.compareFn(node.key, key) === compare.BIGGER) {
      return this.searchNode(node.l, key)
    } else if(this.compareFn(node.key, key) === compare.LESS) {
      return this.searchNode(node.r, key)
    }
    return true
  }
  // 插入节点
  insert(key) {
    if(!this.root) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }
  // 插入节点
  insertNode(node, key) {
    if(this.compareFn(node.key, key) === compare.BIGGER) {
      node.l ? this.insertNode(node.l, key) : node.l = new Node(key)
    } else if(this.compareFn(node.key, key) === compare.LESS) {
      node.r ? this.insertNode(node.r, key) : node.r = new Node(key)
    }
  }
  // 移除节点
  remove(key) {
    this.root = this.removeNode(this.root, key)
  }
  // 移除节点
  removeNode(node, key) {
    if(!node) return null
    if(this.compareFn(node.key, key) === compare.BIGGER) {
      return this.removeNode(node.l, key)
    } else if(this.compareFn(node.key, key) === compare.LESS) {
      return this.removeNode(node.r, key)
    } else {
      if(!node.l && !node.r) {
        return null
      } else if(node.r === null) {
        return node.l
      } else if(node.l === null) {
        return node.r
      } else {
        let min = this.min(node.r)
        node.key = min
        node.r = this.removeNode(node.r, min)
        return node;
      }
    }
  }
  // 查找最小值
  min(node = this.root) {
    let key = undefined
    while(node){
      key = node.key
      node = node.l
    }
    return key
  }
  // 查找最大值
  max(node = this.root) {
    let key = undefined
    while(node){
      key = node.key
      node = node.r
    }
    return key
  }
  // 中序遍历，以最小到最大的顺序遍历访问BST所有的节点
  inOrderTraverse(node, callback) {
    if(!node) {
      this.inOrderTraverse(node.l, callback)
      callback(node.key)
      this.inOrderTraverse(node.r, callback)
    }
  }
  // 先序遍历，先访问本节点，再访问节点的左节点和右节点
  preOrderTraverseNode(node, callback) {
    if(!node) {
      callback(node.key)
      this.preOrderTraverseNode(node.l, callback)
      this.preOrderTraverseNode(node.r, callback)
    }
  }
  // 后序遍历，先访问节点的左右节点，再访问本节点
  postOrderTraverse(node, callback) {
    if(!node) {
      this.preOrderTraverseNode(node.l, callback)
      this.preOrderTraverseNode(node.r, callback)
      callback(node.key)
    }
  }
}