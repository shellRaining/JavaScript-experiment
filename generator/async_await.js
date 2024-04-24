function* showData() {
  const res1 = yield getRequestData("aaa");
  const res2 = yield getRequestData(res1 + "bbb");
  const res3 = yield getRequestData(res2 + "ccc");
}

function getRequestData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
      console.log("data", data);
    }, 1000);
  });
}

function exec(generator) {
  function next(res) {
    const gen = generator.next(res);
    if (gen.done) {
      return gen.value;
    }

    return gen.value.then((value) => {
      next(value)
    })
  }
  next();
}

exec(showData());
