import Ioredis from "ioredis";

// const ioredis = new Ioredis({
//   host: "127.0.0.1", //ip
//   port: 6379, //端口
// });

// //一、字符串

// //存储字符串并且设置过期时间
// ioredis.setex("key", 10, "value");
// //普通存储
// ioredis.set("key", "value");
// //读取
// ioredis.get("key").then((result) => {
//   console.log("Retrieved value:", result);
// });

// //二、集合

// // 添加元素到集合
// ioredis.sadd("myset", "element1", "element2", "element3");

// // 从集合中移除元素
// ioredis.srem("myset", "element2");

// // 检查元素是否存在于集合中
// ioredis.sismember("myset", "element1").then((result) => {
//   console.log("Is member:", result); // true
// });

// // 获取集合中的所有元素
// ioredis.smembers("myset").then((members) => {
//   console.log("Members:", members);
// });

// //三、哈希

// // 设置哈希字段的值
// ioredis.hset("myhash", "field1", "value1");
// ioredis.hset("myhash", "field2", "value2");

// // 获取哈希字段的值
// ioredis.hget("myhash", "field1").then((value) => {
//   console.log("Value:", value); // "value1"
// });

// // 删除哈希字段
// ioredis.hdel("myhash", "field2");

// // 获取整个哈希对象
// ioredis.hgetall("myhash").then((hash) => {
//   console.log("Hash:", hash); // { field1: 'value1' }
// });

// //四、队列

// // 在队列的头部添加元素
// ioredis.lpush("myqueue", "element1");
// ioredis.lpush("myqueue", "element2");

// // 获取队列中所有元素
// ioredis.lrange("myqueue", 0, -1).then((elements) => {
//   console.log("Queue elements:", elements);
// });
// //获取长度
// ioredis.llen("myqueue").then((length) => {
//   console.log("Queue length:", length);
// });

//五、发布/订阅

// 创建与 Redis 服务器的连接
const ioredis = new Ioredis({
  host: "127.0.0.1",
  port: 6379,
});

// 创建另一个 Redis 连接实例
const redis2 = new Ioredis();

// 订阅频道 'channel'
ioredis.subscribe("channel");

// 监听消息事件
ioredis.on("message", (channel, message) => {
  console.log(`Received a message from channel ${channel}: ${message}`);
});

// 发布消息到频道 'channel'
redis2.publish("channel", "hello world");
