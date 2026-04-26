/**
 * ============================================
 *  🎓 观察者模式 - 详细讲解课程
 *  讲师：你的软工讲师
 *  学生：前端实习生
 * ============================================
 */

console.log(`
╔════════════════════════════════════════════════════════╗
║          观察者模式 (Observer Pattern)                ║
║        发布-订阅模式的JavaScript完整讲解              ║
╚════════════════════════════════════════════════════════╝
`);

// ============================================
// 第一部分：理解观察者模式 - 从生活例子开始
// ============================================

console.log(`
\n【第一课】生活中的观察者模式
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

想象你买了一份报纸的订阅服务：

📰 报社（出版者）：负责写文章、印刷报纸
👥 订阅者们：你、你的朋友、你的家人
📧 邮递员（事件总线）：负责把报纸送到每个订阅者手里

关键点：
✓ 当报社出版新报纸时，不需要知道有谁在订阅
✓ 订阅者也不需要去找报社，而是等着收到报纸
✓ 两者是解耦的（独立的）
✓ 如果我不想要报纸了，我可以取消订阅

这就是观察者模式！
`);

// ============================================
// 第二部分：日常前端工作中的观察者模式
// ============================================

console.log(`
\n【第二课】你在前端工作中已经用过了！
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

比如 DOM 事件系统就是观察者模式：

    // 你已经在用观察者模式了！
    const btn = document.querySelector('.btn');
    
    // btn 是"发布者"，你是"观察者"
    btn.addEventListener('click', function() {
      console.log('按钮被点击了');
    });

当按钮被点击时，会通知所有订阅了 click 事件的回调函数。
`);

// ============================================
// 第三部分：最简单的实现 - 从零开始
// ============================================

console.log(`
\n【第三课】最简单的观察者模式实现
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// 版本1：最基础的实现
class EventEmitter {
  constructor() {
    // 用一个对象来存储所有的事件和对应的回调函数
    // 结构：{ 'eventName': [callback1, callback2, ...] }
    this.events = {};
  }

  // 方法1：订阅事件（观察者注册）
  on(eventName, callback) {
    // 如果这个事件还没有被订阅过，就创建一个数组
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    
    // 把回调函数加入到这个事件的订阅列表中
    this.events[eventName].push(callback);
    
    console.log(`✓ 有人订阅了 "${eventName}" 事件`);
  }

  // 方法2：发布事件（发布者发送消息）
  emit(eventName, data) {
    // 检查是否有人订阅了这个事件
    if (!this.events[eventName]) {
      console.log(`⚠ 没有人订阅 "${eventName}" 事件`);
      return;
    }

    // 遍历所有订阅了这个事件的回调函数，逐一执行
    this.events[eventName].forEach(callback => {
      callback(data);
    });
    
    console.log(`📢 "${eventName}" 事件已发布`);
  }
}

console.log('【实现演示】');
const emitter = new EventEmitter();

// 👥 订阅者1
emitter.on('新文章发布', (article) => {
  console.log(`  → 读者甲收到新闻："${article}"`);
});

// 👥 订阅者2
emitter.on('新文章发布', (article) => {
  console.log(`  → 读者乙收到新闻："${article}"`);
});

// 📰 发布者发布事件
emitter.emit('新文章发布', 'JavaScript 学习笔记');

// ============================================
// 第四部分：升级版本 - 添加取消订阅功能
// ============================================

console.log(`
\n【第四课】升级版本 - 取消订阅功能
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

class EventEmitterV2 {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 取消订阅特定的回调函数
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    
    // 找到这个回调函数，然后从数组中删除它
    this.events[eventName] = this.events[eventName].filter(
      fn => fn !== callback
    );
    
    console.log(`✓ 已取消订阅 "${eventName}" 事件`);
  }

  // 发布事件
  emit(eventName, data) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach(callback => {
      callback(data);
    });
  }

  // 只订阅一次，之后自动取消
  once(eventName, callback) {
    const onceCallback = (data) => {
      callback(data);
      // 执行完后自动取消这个订阅
      this.off(eventName, onceCallback);
    };
    
    this.on(eventName, onceCallback);
  }
}

console.log('【升级版演示】');
const emitterV2 = new EventEmitterV2();

// 定义一个回调函数（为了后续能取消订阅）
const handleNews = (news) => {
  console.log(`  📰 收到新闻：${news}`);
};

// 订阅事件
emitterV2.on('新闻发布', handleNews);

// 发布事件
emitterV2.emit('新闻发布', '今天天气很好');

// 取消订阅
emitterV2.off('新闻发布', handleNews);

// 再发布一次，这次没人收到
emitterV2.emit('新闻发布', '明天要下雨');

console.log('\n【once 演示 - 只监听一次】');
const emitterOnce = new EventEmitterV2();
emitterOnce.once('用户登录', (username) => {
  console.log(`  👤 用户 ${username} 登录成功！（只提示一次）`);
});

emitterOnce.emit('用户登录', '张三');
emitterOnce.emit('用户登录', '李四'); // 这次不会触发

// ============================================
// 第五部分：实战应用 - 前端场景
// ============================================

console.log(`
\n【第五课】前端实战应用
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

场景1：购物车状态变化通知
场景2：用户登录状态管理
场景3：表单数据验证结果通知
`);

// 实际应用1：购物车系统
class ShoppingCart {
  constructor() {
    this.items = [];
    this.observer = new EventEmitterV2();
  }

  // 添加商品到购物车
  addItem(item) {
    this.items.push(item);
    
    // 发布"商品已添加"事件
    this.observer.emit('itemAdded', {
      item: item,
      count: this.items.length,
      totalPrice: this.getTotalPrice()
    });
  }

  // 移除商品
  removeItem(index) {
    const removed = this.items.splice(index, 1)[0];
    
    // 发布"商品已移除"事件
    this.observer.emit('itemRemoved', {
      item: removed,
      count: this.items.length,
      totalPrice: this.getTotalPrice()
    });
  }

  // 获取总价
  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  // 暴露订阅方法给其他模块
  on(event, callback) {
    this.observer.on(event, callback);
  }
}

console.log('【购物车应用演示】\n');
const cart = new ShoppingCart();

// 📊 UI模块：购物车数量显示
cart.on('itemAdded', (data) => {
  console.log(`  🎯 UI更新：购物车数量 → ${data.count}`);
});

// 💰 UI模块：总价显示
cart.on('itemAdded', (data) => {
  console.log(`  💰 UI更新：总价 → ¥${data.totalPrice}`);
});

// 📢 通知模块：提示用户
cart.on('itemAdded', (data) => {
  console.log(`  📢 通知：${data.item.name} 已加入购物车`);
});

// 执行操作
cart.addItem({ name: '手机壳', price: 29.9 });
cart.addItem({ name: '充电线', price: 19.9 });

// ============================================
// 第六部分：真实前端场景 - EventBus（事件总线）
// ============================================

console.log(`
\n【第六课】前端真实应用 - EventBus
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

在 Vue / React 项目中，经常需要实现兄弟组件之间的通信。
这就需要用到 EventBus（事件总线）。
`);

class EventBus extends EventEmitterV2 {
  // 这就是前端项目中常见的 EventBus
  // 用来实现组件间的通信
}

console.log('【前端场景：表单验证】\n');
const formBus = new EventBus();

// 组件1：用户名输入框
class UsernameInput {
  constructor(bus) {
    this.bus = bus;
  }

  onChange(value) {
    // 当输入框内容变化时，发布事件
    this.bus.emit('username-changed', value);
  }
}

// 组件2：表单验证器
class FormValidator {
  constructor(bus) {
    this.bus = bus;
    
    // 订阅用户名变化事件
    this.bus.on('username-changed', (username) => {
      this.validateUsername(username);
    });
  }

  validateUsername(username) {
    if (username.length < 3) {
      console.log(`  ❌ 验证失败：用户名至少3个字符`);
      // 发布验证失败事件
      this.bus.emit('username-error', '用户名过短');
    } else {
      console.log(`  ✅ 验证成功：用户名合法`);
      this.bus.emit('username-valid', username);
    }
  }
}

// 组件3：错误提示
class ErrorDisplay {
  constructor(bus) {
    this.bus = bus;
    this.bus.on('username-error', (error) => {
      console.log(`  ⚠️  错误提示：${error}`);
    });
  }
}

// 使用演示
const usernameInput = new UsernameInput(formBus);
const validator = new FormValidator(formBus);
const errorDisplay = new ErrorDisplay(formBus);

usernameInput.onChange('ab');   // 输入短的用户名
usernameInput.onChange('zhangsan'); // 输入长的用户名

// ============================================
// 第七部分：观察者模式 vs 发布-订阅模式（重要！）
// ============================================

console.log(`
\n【第七课】观察者 vs 发布-订阅（容易混淆的概念）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

很多人把这两个混淆了，其实有细微差别：

【观察者模式】
  出版者 ←→ 订阅者
  - 出版者和订阅者直接相连
  - 耦合度较高
  - 例如：DOM 事件系统
  
    btn.addEventListener('click', callback);
    
【发布-订阅模式】
  出版者 ←→ 事件中心 ←→ 订阅者
  - 通过中间人（事件中心）解耦
  - 耦合度低
  - 例如：EventBus、Redux

但在 JavaScript 中，我们通常混用这两个概念
（你也可以认为 JavaScript 的事件系统就是这两者的结合）
`);

// ============================================
// 第八部分：完整的生产级实现
// ============================================

console.log(`
\n【第八课】生产级 EventEmitter 实现
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

class EventEmitterPro {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10; // 防止内存泄漏的最大监听器数
  }

  // 订阅事件
  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('callback 必须是一个函数');
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const listeners = this.events.get(eventName);
    listeners.push(callback);

    // 警告：监听器过多可能导致内存泄漏
    if (listeners.length > this.maxListeners) {
      console.warn(
        `⚠️  警告：${eventName} 事件的监听器数量超过 ${this.maxListeners}，` +
        `可能存在内存泄漏！`
      );
    }

    return this; // 支持链式调用
  }

  // 取消订阅
  off(eventName, callback) {
    if (!this.events.has(eventName)) return this;

    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(callback);

    if (index > -1) {
      listeners.splice(index, 1);
    }

    // 如果没有监听器了，删除这个事件
    if (listeners.length === 0) {
      this.events.delete(eventName);
    }

    return this;
  }

  // 发布事件
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return false;

    const listeners = this.events.get(eventName);
    
    // 创建一个副本，防止在执行时修改原数组
    listeners.slice().forEach(callback => {
      try {
        callback.apply(this, args);
      } catch (error) {
        console.error(`错误：事件 "${eventName}" 执行失败：`, error);
      }
    });

    return true;
  }

  // 只订阅一次
  once(eventName, callback) {
    const onceWrapper = (...args) => {
      callback.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    return this.on(eventName, onceWrapper);
  }

  // 删除所有监听器
  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
    return this;
  }

  // 获取监听器数量
  listenerCount(eventName) {
    return this.events.has(eventName)
      ? this.events.get(eventName).length
      : 0;
  }

  // 支持链式调用
}

console.log('【生产级 EventEmitter 演示】\n');
const emitterPro = new EventEmitterPro();

// 链式调用
emitterPro
  .on('user-login', (user) => console.log(`  👤 用户登录：${user}`))
  .on('user-login', (user) => console.log(`  📊 记录登录日志`))
  .on('user-logout', (user) => console.log(`  👋 用户登出：${user}`));

emitterPro.emit('user-login', 'zhangsan');
console.log(`监听器数量：${emitterPro.listenerCount('user-login')}`);

emitterPro.emit('user-logout', 'zhangsan');

// ============================================
// 第九部分：优缺点分析
// ============================================

console.log(`
\n【第九课】观察者模式的优缺点
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【优点】✅
  1. 降低耦合度 - 发布者和订阅者解耦
  2. 支持动态关系 - 可以在运行时添加/删除订阅者
  3. 符合开闭原则 - 对扩展开放，对修改关闭
  4. 实现事件驱动 - 异步通信，反应灵活
  5. 符合迪米特法则 - 最少知识原则

【缺点】❌
  1. 所有订阅者都会执行 - 可能有性能问题
  2. 难以追踪数据流 - 调试困难（多个事件流交叉）
  3. 容易造成内存泄漏 - 忘记取消订阅
  4. 订阅关系隐藏 - 代码可读性下降

【何时使用】
  - ✅ 多个对象需要监听事件
  - ✅ 发布者不关心订阅者的实现
  - ✅ 事件可能会被多次触发
  - ❌ 不要过度使用，保持代码清晰
`);

// ============================================
// 第十部分：常见问题 QA
// ============================================

console.log(`
\n【第十课】常见问题 Q&A
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: 观察者模式和发布-订阅模式到底有啥区别？
A: 观察者在JS中很难严格区分。简单说：
   - 观察者：直接注册在对象上
   - 发布-订阅：通过中间人（事件中心）
   但在JS中经常混用，你就把EventBus理解为发布-订阅模式就行。

Q2: 怎么避免内存泄漏？
A: 三个方法：
   1. 及时 off() 取消订阅
   2. 使用 once() 只监听一次
   3. 在组件卸载时清理监听器

Q3: 订阅很多事件会不会很慢？
A: 一般不会，除非：
   - 单个事件有成千上万个监听器
   - 回调函数执行很耗时
   如果确实性能有问题，可以用防抖/节流优化

Q4: 能不能在回调中再次订阅同一事件？
A: 可以，但要注意不要造成无限循环

Q5: 多个地方订阅同一事件，执行顺序是啥？
A: 按订阅的顺序执行（FIFO - First In First Out）
`);

// ============================================
// 总结
// ============================================

console.log(`
\n╔════════════════════════════════════════════════════════╗
║                      本课总结                           ║
╚════════════════════════════════════════════════════════╝

观察者模式的核心就三点：

1️⃣  【订阅】- 对象 A 说："嘿，当你发生X事件时，通知我"
2️⃣  【发布】- 对象 B 说："各位，我这里发生了X事件了！"
3️⃣  【通知】- 系统执行所有对象 A 注册的回调函数

在前端开发中，你会频繁遇到：
  • Vue / React 的事件系统
  • Redux / Vuex 的状态管理
  • 组件间的通信
  • 用户交互响应

掌握观察者模式，能让你写出更灵活、更易维护的代码！

现在回顾一下：
  ✓ 理解了观察者模式的核心概念
  ✓ 学会了如何实现一个基本的 EventEmitter
  ✓ 知道了如何在前端项目中应用
  ✓ 清楚了优缺点和注意事项

🎉 恭喜，你已经掌握了观察者模式！
`);

// ============================================
// 补充：可视化对比其他设计模式
// ============================================

console.log(`
\n【附录】观察者模式 vs 其他模式
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

模式          耦合度    实现难度   适用场景
────────────────────────────────────────
观察者        中等      简单      事件通知
工厂          低        中等      对象创建
策略          低        简单      算法选择
装饰者        低        中等      功能扩展
代理          中等      中等      访问控制
单例          低        简单      全局对象
中介者        低        复杂      复杂交互

记住：没有完美的模式，只有合适的模式！
`);
