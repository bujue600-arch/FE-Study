function debounce(fn, delay, immediate = false) {
  let timer = null;
  let canRun = true; // 标记：能不能立刻执行

  const debounced = function (...args) {
    if (immediate) {
      if (canRun) {
        fn.apply(this, args); // 立刻执行
        canRun = false; // 标记为不能执行
      } else {
        if (timer) clearTimeout(timer);
      }
      // 冷却期过后，重置为可执行
      timer = setTimeout(() => {
        canRun = true;
      }, delay);
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };

  debounced.cancel = () => {
    clearTimeout(timer);  // 清掉定时器，未执行的 fn 不会再执行
    timer = null;
    canRun = true;        // 重置状态
  };

  return debounced;
}
