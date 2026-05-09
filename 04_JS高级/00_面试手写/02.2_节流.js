function throttle1(fn, wait) {
  let lastTime = 0;

  return function (...args) {
    let now = Date.now();
    if (now - lastTime > wait) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

function throttle2(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
