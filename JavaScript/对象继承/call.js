function Parent() {
  this.parentName = 'parent'
  this.parentAge = '49'
}

function Children() {
  Parent.call(this)
  this.name = 'children'
  this.age = '23'
}

let children = new Children()
console.log(children)
// 借助call来实现继承，在new一个Children实例的时候，
// 调用Parent.call(this)，将父构造函数的this修改为Children的
// 实例，个人觉得就是将父构造函数的this[属性]拷贝到实例而已