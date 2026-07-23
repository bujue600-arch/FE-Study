function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const res = constructor.apply(obj, args);
  return typeof res === "object" && res !== null ? res : obj;
}

function myInstanceof(obj, constructor) {
  let proto = obj.__proto__;
  while (proto) {
    if (proto === constructor.prototype) return true;
    proto = proto.__proto__;
  }
  return false;
}
