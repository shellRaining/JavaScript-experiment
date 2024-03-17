addEventListener("message", function (e) {
  console.log("Worker: Message received from main script");
  postMessage("You said: " + e.data);
});
