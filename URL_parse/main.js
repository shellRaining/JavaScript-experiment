function parseParams(url) {
  const pattern = /.+\?(.+)$/;
  const paramsStr = pattern.exec(url)[1];
  const pairs = paramsStr.split("&");
  const res = {};

  pairs.forEach((pair) => {
    if (pair.indexOf("=") !== -1) {
      let [key, value] = pair.split("=");
      value = decodeURIComponent(value);
      if (/^\d+$/.test(value)) {
        value = parseInt(value);
      }

      if (res[key]) {
        if (res[key] instanceof Array) {
          res[key].push(value);
        } else {
          res[key] = Array.of(res[key], value);
        }
      } else {
        res[key] = value;
      }
    } else {
      res[pair] = true;
    }
  });

  console.log(res);
}

let url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
parseParams(url);
