Promise.any = function (tasks) {
  return new Promise((resolve, reject) => {
    const len = tasks.length;
    let cnt = 0;

    for (let i = 0; i < len; i++) {
      Promise.resolve(tasks[i]).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          cnt++;
          if (cnt === len) reject(reason);
        },
      );
    }
  });
};

const task1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("task1");
  }, 1000);
});

const task2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("task2");
  }, 2000);
});

const task3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("task3");
  }, 3000);
});

Promise.any([task1, task2, task3]).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  },
);
