function Base(age) {
  this.age = age;
}
function Sub(age, name) {
  Base.call(this, age);
  this.name = name;
}
Base.prototype.speak = function () {};
(function inherit(Base, Sub) {
  const prototype = Object.create(Base.prototype);
  prototype.constructor = Sub;
  Sub.prototype = prototype;
})(Base, Sub);

const sr = new Sub(21, "sr");
sr.speak()
console.log(sr);
console.log(sr.__proto__);
console.log(sr.__proto__.__proto__);
