const Promise = require("./review");

console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

let promise = new Promise((resolve) => {
  console.log(3);
  resolve();
})
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  });

new Promise((resolve) => {
  console.log(7);
  resolve()
}).then(() => {
  console.log(8);
});

console.log(6);

// 1 3 7 6 4 8 5 2
