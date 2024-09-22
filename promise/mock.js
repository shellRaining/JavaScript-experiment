const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(fn) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = (value) => {
      if (this.status !== PENDING) return;
      this.value = value;
      this.status = FULFILLED;
      this.onFulfilledCbs.forEach((cb) => void cb());
    };
    const reject = (reason) => {
      if (this.status !== PENDING) return;
      this.reason = reason;
      this.status = REJECTED;
      this.onRejectedCbs.forEach((cb) => void cb());
    };

    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    const resPromise = new Promise((resolve, reject) => {
      const resolveThen = (cbRet) => {
        if (cbRet === resPromise) return reject(new TypeError());

        if (cbRet instanceof Promise) cbRet.then(resolveThen, reject);
        else if (
          typeof cbRet === "function" ||
          (typeof cbRet === "object" && cbRet !== null)
        ) {
          let then;
          try {
            then = cbRet.then;
            if (typeof then !== "function") resolve(cbRet);
          } catch (e) {
            reject(e);
          }

          let called = false;
          function callOnce(fn) {
            return function (...args) {
              if (called) return;
              called = true;
              fn(...args);
            };
          }
          try {
            then.call(cbRet, callOnce(resolveThen), callOnce(reject));
          } catch (e) {
            callOnce(reject)(e);
          }
        } else resolve(cbRet);
      };
      const fulfilledTask = () => {
        try {
          if (typeof onFulfilled !== "function") resolve(this.value);
          else resolveThen(onFulfilled(this.value));
        } catch (e) {
          reject(e);
        }
      };
      const rejectedTask = () => {
        try {
          if (typeof onRejected !== "function") reject(this.reason);
          else resolveThen(onRejected(this.reason));
        } catch (e) {
          reject(e);
        }
      };
      if (this.status === FULFILLED) queueMicrotask(fulfilledTask);
      else if (this.status === REJECTED) queueMicrotask(rejectedTask);
      else {
        this.onFulfilledCbs.push(() => queueMicrotask(fulfilledTask));
        this.onRejectedCbs.push(() => queueMicrotask(rejectedTask));
      }
    });

    return resPromise;
  }

  static deferred() {
    var result = {};
    result.promise = new Promise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });

    return result;
  }
}

module.exports = Promise;
