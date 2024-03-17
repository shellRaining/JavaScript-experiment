const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

function Promise(fn) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;

  const resolve = (value) => {

  };
  const reject = (reason) => {};

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

const p = new Promise((resolve, reject) => {});
