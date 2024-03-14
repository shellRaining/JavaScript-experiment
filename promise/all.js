Promise.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    const len = promiseList.length;
    const values = new Array(len);
    let cnt = 0;

    if (len == 0) {
      resolve(values);
    }
    promiseList.forEach((promise, idx) => {
      Promise.resolve(promise).then(
        (value) => {
          values[idx] = value;
          cnt++;
          if (cnt == len) {
            resolve(values);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
};
