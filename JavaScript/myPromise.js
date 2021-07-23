
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class myPromise{
  constructor(fn) {
    this.status = PENDING
    this.res = null
    this.error = null
    this.onResolvedList = []
    this.onRejectedList = []

    const resolve = (res) => {
      if(this.status !== PENDING) return
      this.status = RESOLVED
      this.res = res
      this.onResolvedList.forEach( callback => callback(res) )
    }

    const reject = (error) => {
      if(this.status !== PENDING) return
      this.status = REJECTED
      this.error = error
      this.error = error
      this.onRejectedList.forEach( callback => callback(error) )
    }

    fn(resolve, reject)
  }
  then = (onResolved, onRejected) => {
    onResolved = typeof onResolved === 'function' ? onResolved : res => res
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error } 
    return new myPromise((resolve, reject) => {
      if(this.status === PENDING) {
        this.onResolvedList.push((res) => {
          try {
            let x = onResolved(res)
            resolve(x)
          } catch(error) {
            reject(error)
          }
        })
        this.onRejectedList.push((error) => {
          try {
            let x = onRejected(error)
            resolve(x)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === RESOLVED) {
        try {
          let x = onResolved(this.res)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if(this.status === REJECTED) {
        try {
          let x = onRejected(this.error)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
    })
  }
  catch = (onRejected) => {
    return this.then(null, onRejected)
  }
  finally = (fn) => {
    return this.then((res) => {
      fn(res)
      return res
    },(error) => {
      fn(error)
      throw error
    })
  }
}

myPromise.all = (arr) => {
  let resList = []
  let p = 0
  return new myPromise((resolve, reject)=> {
    arr.forEach((promise, index) => {
      resList[index] = undefined
      promise.then((res) => {
        resList[index] = res
        p++
        if(p === arr.length) {
          resolve(resList)
        }
      },(error) => {
        reject(error)
      })
    })
  })
}

myPromise.race = (arr) => {
  return new myPromise((resolve, reject)=> {
    arr.forEach((promise, index) => {
      promise.then((res) => {
        resolve(res)
      },(error) => {
        reject(error)
      })
    })
  })
}

myPromise.resolve = (param) => {
  if(param instanceof myPromise) return param
  return new myPromise((resolve, reject) => {
    if(param && param.then && typeof param === 'function') {
      param.then(resolve, reject)
    } else {
      resolve(param)
    }
  })
}

myPromise.reject = (error) => {
  return new myPromise((resolve, reject) => {
    reject(error)
  })
}

let testPromise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    // reject('you get a error!')
    resolve('tang')
  }, 1000)
})

// 测试myPromise.resolve和myPromise.reject
myPromise.resolve(testPromise).then((res) => {
  console.log('res: ', res)
}).catch((error) => {
  console.log('error: ', error)
})

// let testPromise = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     // reject('you get a error!')
//     resolve('tang')
//   }, 1000)
// })

// testPromise.then((res) => {
//   console.log('1: ', res)
//   return 'ze'
// }).then((res) => {
//   console.log('2: ', res)
//   return 'jian'
// }).then((res) => {
//   console.log('3: ', res)
//   return 'finally'
// }).finally((data) => {
//   console.log('finally: ', data)
// }).catch((error) => {
//   console.log('error: ', error)
// })


// // 测试promise.all和promise.race
// let p1 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p1')
//   }, 1000)
// })

// let p2 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p2')
//   }, 2000)
// })

// let p3 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('p3')
//   }, 1500)
// })

// myPromise.all([p1, p2, p3]).then((arr) => {
//   arr.forEach(e => {
//     console.log('all: ', e)
//   })
// }).catch((error) => {
//   console.log("all: ", error)
// })

// myPromise.race([p1, p2, p3]).then((res) => {
//   console.log('race: ', res)
// }).catch((error) => {
//   console.log("race: ", error)
// })