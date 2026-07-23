class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, fn) {
    this.events[events] ||= [].push(fn);
  }

  off(event, fn) {
    this.events[events] = this.events[events] || [].filter((f) => f !== fn);
  }

  emit(event, ...args) {
    this.events[event] || [].forEach((f) => f(...args));
  }

  // 单次订阅
  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}
