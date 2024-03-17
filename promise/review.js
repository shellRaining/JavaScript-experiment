function Promise(fn) {
  this.status = "pending";
  this.value = null;
  this.reason = null;
  this.fullfilledCbs = [];
  this.rejectedCbs = [];

  const resolve = (value) => {
    if (this.status === "pending") {
      this.status = "fullfilled";
      this.value = value;
      this.fullfilledCbs.forEach((cb) => {
        cb(this.value);
      });
    }
  };
  const reject = (reason) => {
    this.status = "rejected";
    this.reason = reason;
    this.rejectedCbs.forEach((cb) => {
      cb(this.reason);
    });
  };

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.resolve = (params) => {
  if (params instanceof Promise) {
    return params;
  } else {
    return new Promise((resolve) => {
      resolve(params);
    });
  }
};
Promise.reject = (params) => {
  return new Promise((_resolve, reject) => {
    reject(params);
  });
};

function resolvePromise(promise, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (x instanceof MyPromise) {
    // 如果 x 为 Promise ，则使 promise 接受 x 的状态
    // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
    // 这个if跟下面判断then然后拿到执行其实重复了，可有可无
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject);
    }, reject);
  }
  // 如果 x 为对象或者函数
  else if (typeof x === 'object' || typeof x === 'function') {
    // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
    if (x === null) {
      return resolve(x);
    }

    try {
      // 把 x.then 赋值给 then 
      var then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      var called = false;
      // 将 x 作为函数的作用域 this 调用之
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
      // 名字重名了，我直接用匿名函数了
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          function (y) {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 e：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (called) return;

        // 否则以 e 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  let realResolved = onResolved;
  let realRejected = onRejected;

  if (typeof onResolved !== "function") {
    realResolved = (value) => {
      return value;
    };
  }
  if (typeof onRejected !== "function") {
    realRejected = (reason) => {
      if (reason instanceof Error) {
        throw reason;
      } else {
        throw new Error(reason);
      }
    };
  }

  let newPromise;
  if (this.status === "fullfilled") {
    newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onResolved === "function") {
            const x = realResolved(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } else {
            resolve(this.value);
          }
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  } else if (this.status === "rejected") {
    newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onRejected === "function") {
            const x = realRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } else {
            reject(this.reason);
          }
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  } else {
    newPromise = new Promise((resolve, reject) => {
      this.fullfilledCbs.push(() => {
        setTimeout(() => {
          try {
            const x = realResolved(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      this.rejectedCbs.push(() => {
        setTimeout(() => {
          try {
            const x = realRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    });
  }
  return newPromise;
};

Promise.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    const len = promiseList.length;
    const valueList = new Array(len);
    let cnt = 0;

    if (len === 0) {
      return resolve(valueList);
    }
    promiseList.forEach((promise, idx) => {
      Promise.resolve(promise).then(
        (value) => {
          cnt++;
          valueList[idx] = value;
          if (cnt === len) {
            resolve(valueList);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
};

Promise.race = function (promiseList) {
  return new Promise((resolve, reject) => {
    if (promiseList.length === 0) {
      return resolve();
    }
    promiseList.forEach((promise) => {
      Promise.resolve(promise).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
};

Promise.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      return Promise.resolve(fn()).then(() => {
        return resolve(value);
      });
    },
    (reason) => {
      return Promise.resolve(fn()).then(() => {
        throw reason;
      });
    },
  );
};

Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
