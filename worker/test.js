setTimeout(function () {
  setTimeout(function () {
    console.log(1);
  }, 100);

  console.log(2);

  setTimeout(function () {
    console.log(3);
  }, 0);
}, 0);

setTimeout(function () {
  console.log(4);
}, 100);

console.log(5);
