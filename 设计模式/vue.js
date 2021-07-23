const utils = {
  getValue(vm, name) {
    return vm.$data[name.trim()]
  },
  setValue(vm, name, newValue) { 
    vm.$data[name] = newValue
  },
  // 编译模版时解析标签的属性为v-model开头调用的处理函数
  model(vm, node, name) {
    // let value = this.getValue(vm, name)
    node.addEventListener('input', (e) => {
      let newValue = e.target.value
      this.setValue(vm, name, newValue)
    })
  },
  // 编译模板时解析文本标签调用的处理函数
  text(vm, node, name) {
    let res = ''
    if(name.includes('{{')) {
      // {{ xxx }}
      name.replace(/\{\{(.+)\}\}/g, (...args) => {
        new Watcher(vm, args[1], (newValue) => {
          this.updateText(node, newValue)
        })
        res = this.getValue(vm, args[1])
      })
    } else {
      // v-text
      res = this.getValue(vm, name)
    }
    this.updateText(node, res)
  },
  // 更新文本标签的值
  updateText(node, value) {
    node.textContent = value
  },
  // 编译模版时解析标签的属性为v-on开头调用的处理函数
  on(vm, node, name, eventName) {
    node.addEventListener(eventName, vm[name].bind(vm), false)
  }
}

// 编译模版
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    let f = this.compilerFragment(this.el)

    this.compiler(f)

    this.el.appendChild(f)
  }
  // 判断是否为节点标签
  isElementNode(el) {
    return el.nodeType === 1
  }
  // 判断是否为文本标签
  isTextNode(el) {
    return el.nodeType === 3
  }
  // 判断标签的属性是否是v-开头
  isDirector(name) {
    return name.startsWith('v-')
  }
  // 收集挂载节点的标签
  compilerFragment(el) {
    var f = document.createDocumentFragment()
    let firstChild = undefined
    while(firstChild = el.firstChild) {
      f.appendChild(firstChild)
    }
    // console.dir(f)
    return f
  }
  // 处理标签
  compiler(f) {
    let childNodes = Array.from(f.childNodes)
    childNodes.forEach(el => {
      if(this.isElementNode(el)) {
        // 标签节点
        // console.log('标签节点：', el)
        this.compilerElement(el)
      }
      if(this.isTextNode(el)) {
        // 文本节点
        // console.log('文本节点：', el)
        this.compilerText(el)
      }
      if(el.childNodes && el.childNodes.length) this.compiler(el)
    })
  }
  // 解析节点标签
  compilerElement(node) {
    let attributes = Array.from(node.attributes)
    attributes.forEach(attr => {
      const { name, value } = attr
      if(this.isDirector(name)) {
        // v-model, v-text, v-bind, v-on:click
        const [, directive] = name.split('-')
        const [keyName, eventName] = directive.split(':')
        utils[keyName](this.vm, node, value, eventName)
      } else if(name.startsWith("@")) {
        const [, eventName] = name.split('@')
        utils['on'](this.vm, node, value, eventName)
      }
      // console.log(name, value)
    })
  }
  // 解析文本标签
  compilerText(node) {
    const content = node.textContent
    if(/\{\{(.+)\}\}/.test(content)) {
      utils['text'](this.vm, node, content)
    }
  }
}

// 订阅者
class Watcher {
  constructor(vm, name, cb) {
    this.vm = vm
    this.name = name
    this.cb = cb
    this.oldValue = this.getOldValue()
  }
  getOldValue() {
    Dep.target = this
    // 目的是触发响应式对象的getter函数，绑定当前的Watcher
    const oldValue = utils.getValue(this.vm, this.name)
    Dep.target = null
    return oldValue
  }
  update() {
    // 调用watcher绑定回调函数
    const newValue = utils.getValue(this.vm, this.name)
    if(this.oldValue !== newValue) {
      this.cb(newValue)
    }
  }
}

// 收集订阅者，将观察者与订阅者连接
class Dep {
  constructor() {
    this.watcherList = []
  }
  // 收集响应式对象的订阅者watcher
  addWatcher(watcher) {
    this.watcherList.push(watcher)
  }
  // 触发响应式对象的订阅者的watcher的回调函数
  notify() {
    this.watcherList.forEach( w => {
      w.update()
    })
  }
}

// 观察者
class Observer{
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if(data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      })
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      get: () => {
        let target = Dep.target
        target && dep.addWatcher(target)
        return value
      },
      set: (newVal) => {
        if(newVal === value) return
        this.observer(newVal)
        value = newVal
        dep.notify()
      }
    })
  }
}

class vue {
  constructor(option) {
    this.$el = option.el
    this.$data = option.data
    this.$option = option

    this.proxyMethods(option.methods)

    this.proxyData(this.$data)

    new Observer(this.$data)

    new Compiler(this.$el, this)

  }

  // 可以通过this.xxx 改变 this.$data.xxx的值
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          // if(newVal === data[key]) return
          data[key] = newVal
        }
      })
    })
  }

  // 将methods挂载到vue实例上
  proxyMethods(methods) {
    if(methods && typeof methods === 'object') {
      Object.keys(methods).forEach(method => {
        this[method] = methods[method]
      })
    }
  }
}