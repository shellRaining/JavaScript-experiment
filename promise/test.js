const Promise = require("./mock");

// 创建一个直接被拒绝的Promise
let p1 = Promise.reject('error');

// 直接在p1上应用.then方法
p1.then(null, (reason) => {
  console.log(reason); // 正确处理并打印错误
});

// 创建另一个Promise，通过链式调用来处理p1
let p2 = p1.then(undefined);

// p2的处理没有通过测试，表示在链式调用中未正确忽略非函数的onFulfilled
