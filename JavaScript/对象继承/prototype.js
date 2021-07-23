function Parent() {
  this.parentName = 'parent'
  this.parentAge = '49'
}

function Children() {
  this.name = 'children'
  this.age = '23'
}

Children.prototype = new Parent()
Children.prototype.constructor = Children

let children = new Children()
console.log(children.constructor)

// 父类实例被所有的子类实例共享