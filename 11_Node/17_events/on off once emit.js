// Node.js 异步流的核心机制

const EventEmitter = require("events");

const event = new EventEmitter();

const fn = (msg) => {
  console.log(msg);
};
event.on("test", fn);
event.on("test", fn);
event.on("test", fn);
event.off("test", fn);

event.emit("test", "xmxmxmxmx1");
event.emit("test", "xmxmxmxmx2");
