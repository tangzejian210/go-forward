https://leetcode-cn.com/problems/lru-cache/

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.keys = []
  this.cache = {}
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  if(this.cache.hasOwnProperty(key)) {
      this.update(key, null)
      return this.cache[key]
  }
  return -1
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if(this.cache.hasOwnProperty(key)) {
    this.update(key, value)
  } else {
    this.cache[key] = value
    this.keys.push(key)
    this.keys.length > this.capacity && this.removeCache(this.keys[0])
  }
};


LRUCache.prototype.update = function(key, value) {
  this.deleteKey(key)
  this.keys.push(key)
  if(value) this.cache[key] = value;
}

LRUCache.prototype.removeCache = function(key) {
  delete this.cache[key]
  this.deleteKey(key)
}

LRUCache.prototype.deleteKey = function(key) {
  let newArr = []
  for(let i = 0, len = this.keys.length; i < len; i++) {
    if(this.keys[i] !== key) newArr.push(this.keys[i])
  }
  this.keys = newArr
}


//使用Map

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.cache = new Map()
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  if(this.cache.has(key)) {
    let value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }
  return -1
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if(this.cache.has(key)) {
    this.cache.delete(key)
  } else if(this.cache.size >= this.capacity) {
    this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.set(key, value)
};