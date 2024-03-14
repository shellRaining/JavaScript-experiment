function Base(age) {
  this.age = age;
  this.lang = ["c"];
}
function Sub(age, name) {
  Base.call(this, age);
  this.name = name;
}
Base.prototype.speak = function () {
  console.log(this.name, this.lang);
};
Sub.prototype = new Base();

const sr = new Sub(21, "sr");
const shellRaining = new Sub(21, "shellRaining");
sr.lang.push("python");
sr.speak();
shellRaining.speak();
