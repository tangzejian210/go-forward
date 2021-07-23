function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex
  this.sayName = function() {
    console.log(this.name)
  }
}

let p1 = new Person('Tom', 22, 'man')
let p2 = new Person('Job', 24, 'women')
console.log(p1.sayName())
console.log(p2.sayName())

// 构造函数模式
// 解决了对象实例没有标志的问题
// 但是每创建一个实例，构造函数的函数都要重新创建一次。
// new关键字
// 1、创建一个新的对象。
// 2、将新对象的prototype特性指向构造函数的prototype对象。
// 3、将构造函数内部的this指向新对象。
// 4、执行构造函数
// 5、构造函数如果返回非空对象，则返回这个对象，如果没有，则返回这个新对象。