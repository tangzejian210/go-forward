function Person(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}
Person.prototype = {
  constructor: Person,
  city: 'shenzhen',
  sayName: function() {
    this.name
  }
}

let p1 = new Person('Tom', 22, 'man')
let p2 = new Person('Job', 24, 'woman')
console.log(p1.sayName === p2.sayName)

// 可以传参、解决对象实例没有标志的问题、函数不会被重新创建的问题