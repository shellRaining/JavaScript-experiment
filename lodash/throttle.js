function throttle(fn, delay, first, last) {
  let scheduled = false;
  let waiting = false;

  return function (...params) {
    if (!waiting) {
      if (first) {
        fn.apply(this, params)
        first = false
      }
      waiting = true
      setTimeout(() => {
        waiting = false
        if (scheduled && last) {
          fn.apply(this, params)
          scheduled = false
        }
      }, delay);
    } else {
      scheduled = true
    }
  };
}
