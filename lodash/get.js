// a
// a.b.c
// a[0].b.c
// a[0]
function get(obj, path, defaultValue) {
  const newPath = path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  console.log(newPath);
  return (
    newPath.reduce((a, b) => {
      return (a || {})[b];
    }, obj) ?? defaultValue
  );
}

const obj = {
  a: [
    {
      b: {
        c: "hello",
      },
    },
  ],
  d: 0,
};
const res = get(obj, "a[0].b", null);
console.log(res);
console.log(get(obj, "d", null));
