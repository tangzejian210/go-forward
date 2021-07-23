function person(name, age, sex) {
  let obj = new Object()
  obj.name = name
  obj.age = age
  obj.sex = sex
  obj.sayName = function() {
    console.log(this.name)
  }
  return obj
}

let person1 = person('t', 12, 'man')
console.log(person1)
console.log(person1.sayName())
console.log(person._proto_ === Object.prototype)

// 创建对象 -> 工厂模式
// 每次创建实例，没有结果对象实例标志的问题，即person._proto_ === Object.prototype