const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(fn) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((cb) => cb());
    }
  };
  const reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((cb) => cb());
    }
  };

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) return reject(new TypeError("promise equal with res"));
  if (x === null) return resolve(null);
  else if (typeof x !== "function" && typeof x !== "object") return resolve(x);
  else if (x instanceof Promise) {
    return x.then(
      (value) => resolvePromise(promise, value, resolve, reject),
      reject,
    );
  }

  let then;
  try {
    then = x.then;
    if (typeof then !== "function") return resolve(x);
  } catch (e) {
    reject(e);
  }
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
      },
    );
  } catch (error) {
    // 如果调用 then 方法抛出了异常 e：
    // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
    if (called) return;

    // 否则以 e 为据因拒绝 promise
    reject(error);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const fulfilledTask = (resolve, reject) => {
    try {
      if (typeof onFulfilled === "function") {
        const res = onFulfilled(this.value);
        resolvePromise(resPromise, res, resolve, reject);
      } else {
        resolve(this.value);
      }
    } catch (e) {
      reject(e);
    }
  };
  const rejectedTask = (resolve, reject) => {
    try {
      if (typeof onRejected === "function") {
        const res = onRejected(this.reason);
        resolvePromise(resPromise, res, resolve, reject);
      } else {
        reject(this.reason);
      }
    } catch (e) {
      reject(e);
    }
  };

  let resPromise;
  if (this.status === FULFILLED) {
    resPromise = new Promise((resolve, reject) => {
      setTimeout(fulfilledTask, 0, resolve, reject);
    });
  } else if (this.status === REJECTED) {
    resPromise = new Promise((resolve, reject) => {
      setTimeout(rejectedTask, 0, resolve, reject);
    });
  } else {
    resPromise = new Promise((resolve, reject) => {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(fulfilledTask, 0, resolve, reject);
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(rejectedTask, 0, resolve, reject);
      });
    });
  }
  return resPromise;
};

Promise.deferred = function () {
  var result = {};
  result.promise = new Promise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

module.exports = Promise;
