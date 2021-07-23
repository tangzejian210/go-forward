function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

// 本人写的代码
function newFun () {
  
  let newObj = new Object()

  let constrFun = arguments[0]
  let newArg = []
  for(let i = 1, len = arguments.length; i < len; i++){
    newArg.push(arguments[i])
  }
  
  newObj._proto_ = constrFun.prototype
  let res = constrFun.call(newObj, ...newArg)
  return typeof res === 'object' && res !== null ? res : newObj
}

// 大神的做法
// 第一版代码
function objectFactory() {

  var obj = new Object();

  Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  Constructor.apply(obj, arguments);

  return obj;

};