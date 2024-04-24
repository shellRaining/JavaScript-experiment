const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
  reject();
});
setTimeout(() => {
  console.log(5);
}, 0);
promise
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(6);
  })
  .catch(() => {
    console.log(7);
  });
console.log(4);

// 1 2 4 3 6 5

const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve();
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then((arg) => {
      console.log(arg);
    });
  });
first().then((arg) => {
  console.log(arg);
});
console.log(4);

// 3 7 4 1 2 5

console.log(1);
new Promise((resolve) => {
  resolve();
  console.log(2);
}).then(() => {
  console.log(3);
});
setTimeout(() => {
  console.log(4);
}, 0);
console.log(5);

// 1 2 5 3 4

Promise.resolve()
  .then(() => {
    console.log("1");
  })
  .then(() => {
    console.log("2");
  });

setTimeout(() => {
  Promise.resolve()
    .then(() => {
      console.log("3");
    })
    .then(() => {
      console.log("4");
    });
  setInterval(() => {
    console.log("5");
  }, 3000);
  console.log("6");
}, 0);

// 1 2 6 3 4 5 5 ...

setTimeout(function () {
  console.log(1);
}, 0);
console.log(2);
async function s1() {
  console.log(7)
  await s2();
  console.log(8);
}
async function s2() {
  console.log(9);
}
s1();
new Promise((resolve, reject) => {
  console.log(3);
  resolve();
  console.log(6);
}).then(() => console.log(4))
console.log(5);

// 2 7 9 3 6 5 8 4 1
