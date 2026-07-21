const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const throttle = (fn, interval) => {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
};

const deepClone = (obj, map = new WeakMap()) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  let clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  for (let key in obj) {
    clone[key] = deepClone(obj[key], map);
  }

  return clone;
};
