function deepclone(obj, hash = new WeakMap()) {
  if (typeof obj !== "object") return obj;
  if (obj == null) return null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const cloned = new obj.constructor();
  hash.set(obj, cloned);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepclone(obj[key], hash);
    }
  }
  return cloned;
}
