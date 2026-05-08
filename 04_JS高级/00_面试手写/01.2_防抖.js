function debounce(fn, delay, immediate = false) {
  let timer = null;
  let can = true;

  const debounced = function (...args) {
    if (immediate) {
      if (can) {
        fn.apply(this, args);
        can = false;
      } else {
        if (timer) clearTimeout(timer);
      }
      setTimeout(() => {
        can = true;
      }, delay);
    } else {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
