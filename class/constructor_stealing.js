function Base(age) {
  this.age = age;
  this.lang = ["c", "python"];
}

function Sub(age, name) {
  Base.call(this, age);
  this.name = name;
}

const sr = new Sub(21, "sr");
const shellRaining = new Sub(21, "shellRaining");
sr.lang.push('lua')
console.log(sr);
console.log(shellRaining);
