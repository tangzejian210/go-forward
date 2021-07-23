function Parent() {
  this.parentName = 'parent'
  this.parentAge = '49'
}

function Children() {
  Parent.call(this)
  this.name = 'children'
  this.age = '23'
}

Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children


let children = new Children()
console.log(children)
console.log(children._proto_)