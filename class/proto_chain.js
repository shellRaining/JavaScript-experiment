function Parent() {
  this.age = 21;
}

Parent.prototype.speak = function () {
  console.log(`here is shellRaining, age: ${this.age}`);
};

function Child() {
  this.lang = ["c"];
}

Child.prototype = new Parent()

const sr = new Child()
sr.speak()

console.log(sr);
console.log(sr.__proto__);
console.log(sr.__proto__.__proto__);
console.log(sr.__proto__.__proto__.__proto__);
console.log(sr.__proto__.__proto__.__proto__.__proto__);

