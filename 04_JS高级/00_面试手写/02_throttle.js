// ==================== 1. 基础版：时间戳实现 ====================
// 特点：第一次【立即执行】，最后一次【可能不执行】
function throttle(fn, delay) {
  let lastTime = 0; // 上次执行的时间戳

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// ==================== 2. 定时器实现 ====================
// 特点：第一次【延迟执行】，最后一次【会执行】
function throttle2(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) return; // 定时器还在，说明还没到时间，直接忽略

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null; // 执行完，清空定时器，下次才能再进来
    }, delay);
  };
}

/*
 * 和时间戳版的区别：
 *
 * 时间戳版：先执行再等 → 先甜后苦
 * 定时器版：先等再执行 → 先苦后甜
 *
 * 具体表现：
 * - 时间戳版：第一次立即执行，停止触发后不再执行
 * - 定时器版：第一次延迟执行，停止触发后还会执行最后一次
 */

// ==================== 3. 终极版：时间戳 + 定时器 ====================
// 支持 leading（是否立即执行）和 trailing（是否执行最后一次）
function throttle3(fn, delay, options = {}) {
  let lastTime = 0;
  let timer = null;

  // 默认：leading = true, trailing = true
  const leading = options.leading !== false; // 默认 true
  const trailing = options.trailing !== false; // 默认 true

  const throttled = function (...args) {
    const now = Date.now();

    // 如果不需要首次立即执行，且是第一次调用，把 lastTime 设为 now
    if (!leading && lastTime === 0) {
      lastTime = now;
    }

    const remaining = delay - (now - lastTime); // 距离下次可执行还剩多少时间

    if (remaining <= 0) {
      // 到时间了，可以执行
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer && trailing) {
      // 没到时间，且没有定时器，且允许尾部执行 → 设一个定时器
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };

  // 取消功能
  throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastTime = 0;
  };

  return throttled;
}

/*
 * 终极版的核心思路：
 *
 * 把两种实现【合二为一】：
 * 1. 时间戳部分 → 处理 "到时间了就立即执行" 的逻辑
 * 2. 定时器部分 → 处理 "最后一次也要执行" 的逻辑
 *
 * 两个开关的组合：
 * ┌─────────────┬──────────────┬──────────────────────────┐
 * │   leading   │   trailing   │   效果                   │
 * ├─────────────┼──────────────┼──────────────────────────┤
 * │   true      │   true       │ 立即执行 + 最后也执行     │ ← 默认
 * │   true      │   false      │ 立即执行 + 最后不执行     │
 * │   false     │   true       │ 延迟执行 + 最后也执行     │
 * │   false     │   false      │ 没意义，等于不执行        │
 * └─────────────┴──────────────┴──────────────────────────┘
 *
 * remaining 的妙用：
 * - 如果 remaining <= 0 → 说明间隔够了，直接执行
 * - 如果 remaining > 0 → 说明还没到时间，设一个 remaining 毫秒后执行的定时器
 *   这样定时器的时间是「精确的剩余时间」，而不是固定的 delay
 */
