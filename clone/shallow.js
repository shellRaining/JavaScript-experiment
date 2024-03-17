function shallowClone(obj) {
  if (typeof obj !== "object") return obj;
  if (obj === null) return null;

  const res = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key];
    }
  }
  return res;
}
