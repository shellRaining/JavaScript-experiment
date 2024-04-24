Promise.race = function (tasks) {
  return new Promise((resolve, reject) => {
    const len = tasks.length;
    for (let i = 0; i < len; i++) {
      Promise.resolve(tasks[i]).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        },
      );
    }
  });
};
