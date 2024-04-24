var flatten = function (arr, n) {
  if (n == 0) return arr;
  const res = [];
  for (const elem of arr) {
    if (elem instanceof Array) res.push(...flatten(elem, n - 1));
    else res.push(elem);
  }
  return res;
};

console.log(
  flatten([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], -1),
);
