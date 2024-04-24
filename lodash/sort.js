function sort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  let left = [];
  let right = [];
  const pivotIdx = Math.floor(len / 2);
  const pivot = arr[pivotIdx];

  for (let i = 0; i < len; i++) {
    if (pivotIdx != i) {
      const val = arr[i];
      (val < pivot ? left : right).push(val);
    }
  }

  left = sort(left);
  right = sort(right);

  return left.concat([pivot], right);
}

console.log(sort([5, 4, 3, 2, 1]));
