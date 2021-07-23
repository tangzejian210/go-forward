function Person() {

}
Person.prototype.name = 'Tom'
Person.prototype.sayName = function() {
  console.log(this.name)
}

let p1 = new Person()
// 实例对象的时候，函数不会被创建一遍
// 原型上的属性和函数被所有的实例共享
// 解决了实例没有标志的问题