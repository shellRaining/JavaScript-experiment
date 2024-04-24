const obj = { a: 1 };
a = 2
global.a = 3

function call(env, ...args) {
  env = env ?? global;
  const key = Symbol();
  env[key] = this;
  const res = env[key](...args);
  delete env[key];
  return res;
}

function log() {
  console.log(this.a);
}
log.__proto__ = Object.create({call})

log.call(obj)
log.call()
