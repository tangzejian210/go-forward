class Event{
  constructor() {
    this.eventList = {}
  }
  on(key, cb) {
    if(typeof cb !== 'function') throw new TypeError('callback is no a function!')
    let event = this.eventList[key] || []
    for(let i = 0, len = event.length; i < len; i++) {
      if(event[i] === cb) {
        return
      }
    }
    event.push(cb)
    this.eventList[key] = event
  }
  emit(key, ...arg) {
    let event = this.eventList[key] || []
    for(let i = 0, len = event.length; i < len; i++) {
      event[i](arg)
    }
  }
  off(key, cb) {
    let event = this.eventList[key] || []
    for(let i = 0, len = event.length; i < len; i++) {
      if(event[i] === cb) {
        event.splice(i, 1)
        this.eventList[key] = event
        return
      }
    }
  }
}

let fn = () => { console.log(3) }

let event = new Event()
event.on('test', () => { console.log(1) })
event.on('test', () => { console.log(2) })
event.on('test', fn)
console.log(event)
event.off('test', fn)

setTimeout(() => {
  event.emit('test')
}, 1000)