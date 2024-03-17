class CancelToken {
  constructor(cancelFn) {
    this.promise = new Promise((resolve, reject) => {
      cancelFn(resolve);
    });
  }
}

const startBtn = document.querySelector("#start");
const cancelBtn = document.querySelector("#cancel");

function cancellableDelaySolve(delay) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      console.log("done");
      resolve();
    }, delay);

    const cancelToken = new CancelToken((resolve) => {
      cancelBtn.addEventListener("click", resolve);
    });

    cancelToken.promise.then(() => {
      clearTimeout(id);
    });
  });
}

startBtn.addEventListener("click", () => {
  cancellableDelaySolve(1000);
});
