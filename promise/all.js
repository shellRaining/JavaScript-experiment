// Promise.all = function (promiseList) {
//   return new Promise((resolve, reject) => {
//     const len = promiseList.length;
//     const values = new Array(len);
//     let cnt = 0;
//
//     if (len == 0) {
//       resolve(values);
//     }
//     promiseList.forEach((promise, idx) => {
//       Promise.resolve(promise).then(
//         (value) => {
//           values[idx] = value;
//           cnt++;
//           if (cnt == len) {
//             resolve(values);
//           }
//         },
//         (reason) => {
//           reject(reason);
//         },
//       );
//     });
//   });
// };

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('sleep', time);
      resolve(time);
    }, time);
  });
}

const tasks = [
  () => sleep(700),
  () => sleep(2000),
  () => sleep(1500),
  () => sleep(1000),
  () => sleep(500)
]

function createRequest(tasks, limit = 6) {
  return new Promise((resolve, reject) => {
    let cnt = 0
    let idx = 0
    const len = tasks.length
    const res = new Array(len)

    function step(i) {
      if (i < len) {
        Promise.resolve(tasks[i]()).then((value) => {
          res[i] = value
          cnt++
          if (cnt === len) {
            resolve(res)
          }
          step(idx)
        }, (reason) => {
          reject(reason)
        })
      }
      idx++
    }

    for (let i = 0; i < limit; i++) {
      step(i)
    }
  })
}

createRequest(tasks, 3).then((value) => {
  console.log(value);
})
