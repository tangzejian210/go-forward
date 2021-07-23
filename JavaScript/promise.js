class Promise {
  // 定义Promise状态变量，初始值为pending
  status = 'pending';
  // 因为在then方法中需要处理Promise成功或失败时的值，所以需要一个全局变量存储这个值
  data = '';
  // Promise resolve时的回调函数集
  onResolvedCallback = [];
  // Promise reject时的回调函数集
  onRejectedCallback = [];

  // Promise构造函数，传入参数为一个可执行的函数
  constructor(executor) {
    // resolve函数负责把状态转换为resolved
    function resolve(value) {
      this.status = 'resolved';
      this.data = value;
      for (const func of this.onResolvedCallback) {
        func(this.data);
      }
    }
    // reject函数负责把状态转换为rejected
    function reject(reason) {
      this.status = 'rejected';
      this.data = reason;
      for (const func of this.onRejectedCallback) {
        func(this.data);
      }
    }

    // 直接执行executor函数，参数为处理函数resolve, reject。因为executor执行过程有可能会出错，错误情况需要执行reject
    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }
  /**
    * 拥有一个then方法
    * then方法提供：状态为resolved时的回调函数onResolved，状态为rejected时的回调函数onRejected
    * 返回一个新的Promise
  */
  then(onResolved, onRejected) {

    // 设置then的默认参数，默认参数实现Promise的值的穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) { return e };
    onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e };

    let promise2;

    promise2 =  new Promise((resolve, reject) => {
      // 如果状态为resolved，则执行onResolved
      if (this.status === 'resolved') {
        setTimeout(() => {
          try {
            // onResolved/onRejected有返回值则把返回值定义为x
            const x = onResolved(this.data);
            // 执行[[Resolve]](promise2, x)
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果状态为rejected，则执行onRejected
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.data);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果状态为pending，则把处理函数进行存储
      if (this.status = 'pending') {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }

    });

    return promise2;
  }

  // [[Resolve]](promise2, x)函数
  resolvePromise(promise2, x, resolve, reject) {
    
  }
  
}


function test(resolve, reject) {
  var timeOut = Math.random() * 2;
  console.log('set timeout to: ' + timeOut + ' seconds.');
  setTimeout(function () {
      if (timeOut < 1) {
        console.log('call resolve()...');
        resolve('200 OK');
      } else {
        console.log('call reject()...');
        reject('timeout in ' + timeOut + ' seconds.');
      }
  }, timeOut * 2000);
}

new Promise(test).then(function (result) {
  console.log('成功1：' + result);
  return "成功1"
}).then(function (result) {
  console.log('成功2：' + result);
  return "成功2"
}).catch(function (reason) {
  console.log('失败：' + reason);
}).finally(function() {
  console.log('finally');
});


var p1 =new Promise(function(resolve,reject){
  setTimeout(function(){
      resolve(1);
  }, 300)
});
var p2 = new Promise(function(resolve,reject){
      setTimeout(function(){
          resolve(2);
      },200)
});
var p3 = function(resolve,reject){
  setTimeout(function(){
    reject('this is a error')
  },100)
}
// Promise.all([p1, p2, p3]).then(function (results) {
//   console.log("success")
//    console.log(results);
// }).catch(function(r){
//   console.log("err");
//   console.log(r);
// });

Promise.race([p1, p2, p3]).then(function (results) {
  console.log("success")
   console.log(results);
}).catch(function(r){
  console.log("err");
  console.log(r);
});

let moreCallBack = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("tangzejian")
  },2000)
})

moreCallBack.then((res) => {
  console.log('1:', res)
})

moreCallBack.then((res) => {
  console.log('2:', res)
})