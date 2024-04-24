function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

console.log(generateSequence);

// "generator function" 创建了一个 "generator object"
let generator = generateSequence();
console.log(typeof generator);

