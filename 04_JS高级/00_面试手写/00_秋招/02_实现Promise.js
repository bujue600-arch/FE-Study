const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.result = null;
    this.onResolvedcbs = [];
    this.onRejectedcbs = [];

    const resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULLFILLED;
        this.result = val;
        this.onResolvedcbs.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.result = reason;
        this.onRejectedcbs.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status === FULLFILLED) {
        const res = onFullfilled(this.result);
        resolve(res);
      }
      if (this.status === REJECTED) {
        const res = onRejected(this.result);
        resolve(res);
      }
      if (this.status === PENDING) {
        this.onResolvedcbs.push(() => {
          const res = onFullfilled(this.result);
          resolve(res);
        });
        this.onRejectedcbs.push(() => {
          const res = onRejected(this.result);
          resolve(res);
        });
      }
    });
  }

  static resolve(val) {
    return new MyPromise((resolve, reject) => {
      resolve(val);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      let count = 0;
      promises.forEach((p, index) => {
        p.then(
          (res) => {
            result[index] = res;
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          },
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          },
        );
      });
    });
  }
}
