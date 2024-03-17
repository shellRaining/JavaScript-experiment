const worker = new Worker("./worker.js");
worker.postMessage("hello");
worker.onmessage = function (e) {
  console.log("Main: Message received from worker", e.data);
};
