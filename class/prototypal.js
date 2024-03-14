const base = { age: 21, lang: ["c"] };
function object(target) {
  function f() {}
  f.prototype = target;
  return new f();
}
const sr = object(base);
const shellraining = object(base);
sr.lang.push("python");
shellraining.age = 22
console.log(sr.age, sr.lang);
console.log(shellraining.age, shellraining.lang);
