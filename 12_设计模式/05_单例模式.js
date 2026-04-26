/*
╔════════════════════════════════════════════════════════════════════╗
║                     单例模式讲解与示例                              ║
║                  Singleton Pattern in JavaScript                  ║
╚════════════════════════════════════════════════════════════════════╝

【核心概念】
单例模式是一种创建型设计模式，用来保证一个类仅有一个实例，并提供一个全局访问点。

用大白话说：
"无论你创建多少次，始终只会得到一个对象"

【生活中的类比】
想象你在一个公司里：
- 公司只有一个总经理，不可能有两个总经理
- 无论谁去找总经理，都是同一个人
- 这个人是唯一的、全局可访问的
这就是单例模式的思想！
*/

// ============================================================================
// 【第一步】先看看 ❌ 错误的做法（为什么需要单例模式？）
// ============================================================================
console.log("\n========== 第一部分：错误做法 ==========\n");

// 问题场景：假设我们要管理应用的唯一配置中心
class ConfigCenter {
  constructor() {
    this.config = {
      apiUrl: "https://api.example.com",
      timeout: 5000,
      debug: false,
    };
  }

  getConfig() {
    return this.config;
  }

  setConfig(key, value) {
    this.config[key] = value;
  }
}

// ❌ 问题来了！我们可以创建多个实例
const config1 = new ConfigCenter();
const config2 = new ConfigCenter();
const config3 = new ConfigCenter();

console.log("❌ 问题演示：");
console.log("config1 === config2:", config1 === config2); // false，不是同一个对象！
console.log("config1 === config3:", config1 === config3); // false，不是同一个对象！

config1.setConfig("apiUrl", "https://new-api.com");
console.log("config1的apiUrl:", config1.getConfig().apiUrl); // https://new-api.com
console.log("config2的apiUrl:", config2.getConfig().apiUrl); // https://api.example.com
console.log("⚠️  同样的配置中心，却有不同的值！这会导致数据不一致！\n");

// ============================================================================
// 【第二步】✅ 解决方案1：使用私有变量 + 立即执行函数表达式 (IIFE)
// ============================================================================
console.log("========== 第二部分：方案1 - IIFE + 闭包 ==========\n");

/*
【重点！这是底层原理讲解】

为什么 IIFE + 闭包 能实现单例？一共三个关键词：

1️⃣  IIFE (Immediately Invoked Function Expression) - 立即执行函数
   - (function() { ... })() 这样的写法
   - 函数定义完了立即执行一遍
   - 好处：形成独立的作用域，变量不会污染全局

2️⃣  函数作用域 (Function Scope) - JavaScript的变量隔离
   - 函数内部定义的变量 ONLY 能在函数内部访问
   - 外面的代码完全访问不到
   - 这就是"私有"的核心秘密

3️⃣  闭包 (Closure) - 函数的"记忆力"
   - 函数执行完了，但它返回的函数/对象还能记住当时的变量
   - 就像一个"冻结的时间胶囊"


【底层执行流程】

第一步：定义并立即执行这个函数
──────────────────────────────────
const Singleton1 = (function() {
  let instance = null;           // 👈 这一刻，instance 被创建，值为 null
                                  // 重要：这个 instance 被"锁"在函数内部
  return {                        // 👈 函数立即返回一个对象
    getInstance: function() { ... }
  };
})();  // ⬆️ 注意这个 ()，表示立即执行

执行结束后，发生了什么？
┌─────────────────────────────────┐
│ 全局作用域                       │
│                                 │
│  Singleton1 = {                │
│    getInstance: [Function]     │
│  }                              │
│                                 │
│  ⚠️  外面看不到 instance        │
│     它被隐藏在函数内部了！      │
└─────────────────────────────────┘

第二步：第一次调用 getInstance()
──────────────────────────────────
const s1 = Singleton1.getInstance();

发生的过程：
┌─────────────────────────────────────────┐
│ 调用时的内存快照                        │
├─────────────────────────────────────────┤
│ 私有的 instance 变量                   │
│  ↓                                      │
│  instance = null                        │
│  ✓ 检查：instance === null? YES         │
│  → 创建实例对象                         │
│  → instance = { config: {...}, ... }   │
│  → 返回这个 instance                    │
│  → s1 指向这个实例                      │
└─────────────────────────────────────────┘

关键：instance 现在是这样的内存地址 👉 0x12345678


第三步：第二次调用 getInstance()
──────────────────────────────────
const s2 = Singleton1.getInstance();

发生的过程：
┌─────────────────────────────────────────┐
│ 再次调用时的内存快照                    │
├─────────────────────────────────────────┤
│ 私有的 instance 变量                   │
│  ↓                                      │
│  instance = { config: {...}, ... }      │ ⬅️ 不是 null！
│  ✓ 检查：instance === null? NO          │
│  → 直接返回已有的 instance              │
│  → s2 指向同样的内存地址 👉 0x12345678 │
│                                         │
│  ✨ s1 === s2 为 true！✨               │
└─────────────────────────────────────────┘

第四步：第三次、第四次...都是一样的
──────────────────────────────────
const s3 = Singleton1.getInstance();
// s3 仍然指向 0x12345678
// s1 === s2 === s3 都是 true


【闭包的魔法】

为什么 getInstance() 方法能"记住" instance？
这就是闭包的力量！

当 IIFE 返回对象时：
{
  getInstance: function() { 
    // 这个函数形成了闭包
    // 它"牢牢记住"了外层函数的 instance 变量
    // 即使外层函数执行完了，这个内存也不会被回收！
    if (instance === null) { ... }
  }
}

JavaScript 引擎说：
"你这个函数需要 instance，我不能删它，要一直保留在内存里"

这就是为什么：
✅ instance 不会被垃圾回收
✅ getInstance 能一直访问它
✅ 每次都能检查是否已经创建
✅ 完美实现单例！


【与其他方式的对比】

❌ 如果不用闭包的后果：
────────────────────

// 不能直接这样（外面能看到 instance）
let instance = null;

function getInstance() {
  if (instance === null) {
    instance = { ... };
  }
  return instance;
}

// 问题：谁都能改这个 instance！
instance = null;  // 🚨 有人重置了它！
instance = { ... }; // 🚨 有人偷偷修改了它！

// 单例被破坏了！


✅ 使用闭包后：
────────────────

const Singleton1 = (function() {
  let instance = null;  // 🔒 私有化了！谁都改不了！

  return {
    getInstance: function() { ... }
  };
})();

instance = null;  // 🚨 改不了！报错或无效！
// 外面根本看不到这个 instance

// 真正的单例！


【内存示意图】

程序启动后的内存布局：
═══════════════════════════════════════

全局内存：
┌──────────────────────────┐
│ Singleton1 引用          │
│   ↓                      │
│  {                       │
│    getInstance: ◄─────┐  │
│  }                    │  │
└──────────────────────────┘
                        │
被隐藏的私有内存        │
┌──────────────────────────┐
│ instance = null ⬅─────────┘
│ （这片内存区域）         │
│ 因为闭包的存在，         │
│ 永远不会被销毁           │
│ 因为外面的代码无法       │
│ 直接访问这片区域         │
│ 只能通过 getInstance()   │
└──────────────────────────┘


【总结秘诀】

IIFE 的作用：
→ 立即执行，创建一个"隔离舱"
→ 函数内的变量在"隔离舱"里

闭包的作用：
→ 被返回的函数记住隔离舱内的变量
→ 形成"钥匙"，只能通过 getInstance() 访问

结果：
→ instance 被"冻结"在内存里
→ 永远只有一份
→ 只能通过 getInstance() 获取
→ 完美的单例！

*/

const Singleton1 = (function () {
  // 【关键】这个 instance 变量被"锁"在了这个函数内部
  // 外面的任何代码都无法直接访问或修改它
  // 这就是 JavaScript 的函数作用域的力量！
  let instance = null;

  // 返回一个对象，这个对象是"密钥"
  // 想要得到 instance，必须通过这个密钥（getInstance 方法）
  return {
    getInstance: function () {
      // 【闭包魔法发生了】
      // 这个函数能访问外层函数的 instance 变量
      // 即使外层函数已经执行完了，instance 仍然活着

      // 第一次调用时创建实例
      if (instance === null) {
        instance = {
          config: {
            apiUrl: "https://api.example.com",
            timeout: 5000,
            debug: false,
          },
          getConfig() {
            return this.config;
          },
          setConfig(key, value) {
            this.config[key] = value;
          },
        };
      }
      // 之后每次都返回同一个实例
      return instance;
    },
  };
})();

// ✅ 现在试试看
const s1 = Singleton1.getInstance();
const s2 = Singleton1.getInstance();
const s3 = Singleton1.getInstance();

console.log("✅ 方案1效果：");
console.log("s1 === s2:", s1 === s2); // true，都是同一个对象！
console.log("s1 === s3:", s1 === s3); // true，都是同一个对象！

s1.setConfig("apiUrl", "https://new-api.com");
console.log("s1的apiUrl:", s1.getConfig().apiUrl);
console.log("s2的apiUrl:", s2.getConfig().apiUrl);
console.log("✓ 现在它们的值是一致的了！\n");

/*
【讲解】这个方案用到了什么技巧？

1. IIFE（立即执行函数表达式）
   - (function() { ... })() 这样写的好处是立即执行，形成一个独立的作用域

2. 闭包 (Closure)
   - instance 变量被包裹在函数内部，外界无法直接访问
   - 但 getInstance 方法可以访问到 instance，这就是闭包

3. 为什么这样做是"私有"的？
   - 你无法从外面直接修改 instance
   - 只能通过 getInstance 方法来获取它
   - 这就保证了实例的唯一性！
*/

// ============================================================================
// 【第三步】✅ 解决方案2：使用构造函数 + 静态属性（更易理解）
// ============================================================================
console.log("========== 第三部分：方案2 - 构造函数 + 静态属性 ==========\n");

class Singleton2 {
  constructor() {
    // 如果已经有实例了，就返回已有的实例，不创建新的
    if (Singleton2.instance) {
      return Singleton2.instance;
    }

    // 第一次创建时执行初始化
    this.config = {
      apiUrl: "https://api.example.com",
      timeout: 5000,
      debug: false,
    };

    // 把这个实例保存到静态属性中
    Singleton2.instance = this;
  }

  getConfig() {
    return this.config;
  }

  setConfig(key, value) {
    this.config[key] = value;
  }
}

// ✅ 即使用 new 关键字创建多次，也只会得到一个实例
const instance1 = new Singleton2();
const instance2 = new Singleton2();
const instance3 = new Singleton2();

console.log("✅ 方案2效果：");
console.log("instance1 === instance2:", instance1 === instance2); // true
console.log("instance2 === instance3:", instance2 === instance3); // true

instance1.setConfig("debug", true);
console.log("instance1.debug:", instance1.getConfig().debug);
console.log("instance2.debug:", instance2.getConfig().debug);
console.log("instance3.debug:", instance3.getConfig().debug);
console.log("✓ 所有实例都是同一个！\n");

/*
【讲解】这个方案有什么特点？

1. 更符合面向对象的思想
   - 看起来就像普通的类
   - 但构造函数内部做了"把戏"

2. 关键原理：
   - Singleton2.instance 是一个静态属性（所有实例共享）
   - 每次 new Singleton2() 时，构造函数都会检查
   - 如果已经有实例，就直接返回它，不创建新的

3. 问题：
   - 每次都要 new，有点浪费
   - 不够优雅（我们想要同步实例，但要检查两次）
*/

// ============================================================================
// 【第四步】✅ 解决方案3：代理模式实现单例（最优雅）
// ============================================================================
console.log("========== 第四部分：方案3 - 代理模式（最推荐）==========\n");

class Singleton3 {
  constructor() {
    this.config = {
      apiUrl: "https://api.example.com",
      timeout: 5000,
      debug: false,
    };
  }

  getConfig() {
    return this.config;
  }

  setConfig(key, value) {
    this.config[key] = value;
  }
}

// 创建一个代理，代理来管理实例的唯一性
const ProxySingleton3 = (function () {
  let instance = null;

  return new Proxy(Singleton3, {
    // construct 拦截 new 操作
    construct(target) {
      // 如果没有实例就创建，否则返回已有的
      if (!instance) {
        instance = new target();
      }
      return instance;
    },
  });
})();

// ✅ 使用代理实现
const p1 = new ProxySingleton3();
const p2 = new ProxySingleton3();
const p3 = new ProxySingleton3();

console.log("✅ 方案3效果（代理模式）：");
console.log("p1 === p2:", p1 === p2); // true
console.log("p2 === p3:", p2 === p3); // true

p1.setConfig("apiUrl", "https://proxy-api.com");
console.log("所有实例的apiUrl:", p1.getConfig().apiUrl);
console.log("✓ 优雅而强大！\n");

/*
【讲解】Proxy 是什么？

Proxy（代理）是 ES6 提供的强大功能：
- 它可以拦截和自定义对象的基本操作
- construct 是其中一种拦截方式，用来拦截 new 操作
- 相当于给类"套上一个代理"，所有的创建操作都要经过它的同意

这是最现代、最优雅的实现方式！
*/

// ============================================================================
// 【第五步】实际应用场景
// ============================================================================
console.log("========== 第五部分：实际应用场景 ==========\n");

// 场景1：应用配置中心（你刚才看过的）
console.log("【场景1】应用配置中心");

// 场景2：日志记录器
console.log("\n【场景2】日志记录器");

class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getAllLogs() {
    return this.logs;
  }
}

const logger1 = new Logger();
const logger2 = new Logger();

logger1.log("用户登录成功");
logger2.log("数据已保存");

console.log("\n所有日志（通过logger1查看）:", logger1.getAllLogs());
console.log("所有日志（通过logger2查看）:", logger2.getAllLogs());
console.log("✓ logger1和logger2看到的是同一份日志！\n");

// 场景3：数据库连接池
console.log("【场景3】数据库连接池（前端实习生可能会接触到）");

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.connection = "已连接到数据库";
    DatabaseConnection.instance = this;
  }

  query(sql) {
    console.log(`执行SQL: ${sql}`);
    console.log("通过单一连接执行");
  }
}

const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

db1.query("SELECT * FROM users");
db2.query('UPDATE users SET name = "张三"');

console.log("\ndb1 === db2:", db1 === db2);
console.log("✓ 所有数据库操作都通过同一个连接！\n");

// 场景4：Vue/React 中的全局状态管理
console.log("【场景4】前端中的全局状态管理（Redux 或 Pinia）");

class GlobalStore {
  constructor() {
    if (GlobalStore.instance) {
      return GlobalStore.instance;
    }
    this.state = {
      user: null,
      token: null,
      notifications: [],
    };
    GlobalStore.instance = this;
  }

  getState() {
    return this.state;
  }

  setState(key, value) {
    this.state[key] = value;
  }
}

const store1 = new GlobalStore();
const store2 = new GlobalStore();

store1.setState("user", { id: 1, name: "小明" });
console.log("store2获取用户:", store2.getState().user);
console.log("✓ 组件A和组件B访问同一份全局状态！\n");

// ============================================================================
// 【第六步】对比不同方案
// ============================================================================
console.log("========== 第六部分：方案对比 ==========\n");

console.log(`
┌─────────────┬──────────────┬──────────┬──────────────┐
│   方案      │   优点       │   缺点   │   推荐指数   │
├─────────────┼──────────────┼──────────┼──────────────┤
│ IIFE+闭包   │ 完全私有     │ 不够直观 │ ⭐⭐⭐⭐     │
├─────────────┼──────────────┼──────────┼──────────────┤
│ 构造函数+   │ 易于理解     │ 不符合   │ ⭐⭐⭐      │
│ 静态属性    │ 面向对象思想 │          │              │
├─────────────┼──────────────┼──────────┼──────────────┤
│ 代理模式    │ 最优雅       │ 需要ES6  │ ⭐⭐⭐⭐⭐  │
│ (Proxy)     │ 最清晰       │          │              │
└─────────────┴──────────────┴──────────┴──────────────┘
`);

console.log(
  "【建议】作为前端工程师，推荐使用方案3（Proxy）或方案1（IIFE+闭包）\n",
);

// ============================================================================
// 【第七步】单例模式的优缺点
// ============================================================================
console.log("========== 第七部分：优缺点分析 ==========\n");

console.log(`
【优点】✅
1. 全局访问点
   - 可以在程序的任何地方访问到唯一的实例
   - 方便数据共享和交互

2. 资源节省
   - 只创建一个实例，节省内存
   - 避免重复创建造成的资源浪费

3. 线程安全（在多线程场景中）
   - 保证实例的唯一性
   - 避免并发问题
   
4. 延迟初始化
   - 可以在需要时才创建实例
   - 加快应用启动速度


【缺点】❌
1. 违反单一职责原则
   - 类既要实现业务逻辑，又要保证只有一个实例

2. 隐藏依赖关系
   - 模块之间的依赖关系不清晰
   - 代码的可测试性可能降低

3. 不易扩展
   - 如果以后想要多个实例，改动会比较大

4. 全局变量的问题
   - 可能导致全局污染
   - 调试时较难追踪

【什么时候用单例？】🤔
- 日志系统
- 配置管理
- 数据库连接
- 线程池
- 缓存
- 对话框
- 打印机驱动程序
- 全局事件总线
`);

// ============================================================================
// 【第八步】实战：手写一个完整的单例
// ============================================================================
console.log("========== 第八部分：实战项目 ==========\n");

// 场景：前端项目中的 API 管理器
class ApiManager {
  constructor() {
    if (ApiManager.instance) {
      return ApiManager.instance;
    }

    this.baseUrl = "https://api.example.com";
    this.timeout = 5000;
    this.interceptors = {
      request: [],
      response: [],
    };

    ApiManager.instance = this;
  }

  // 设置基础 URL
  setBaseUrl(url) {
    this.baseUrl = url;
  }

  // 添加请求拦截器
  addRequestInterceptor(fn) {
    this.interceptors.request.push(fn);
  }

  // 添加响应拦截器
  addResponseInterceptor(fn) {
    this.interceptors.response.push(fn);
  }

  // 执行请求（模拟）
  async request(url, options = {}) {
    console.log(`\n📤 发起请求: ${this.baseUrl}${url}`);

    // 执行请求拦截器
    this.interceptors.request.forEach((fn) => fn(options));

    // 模拟网络请求
    const response = {
      status: 200,
      data: { message: "请求成功" },
    };

    // 执行响应拦截器
    this.interceptors.response.forEach((fn) => fn(response));

    return response;
  }

  getConfig() {
    return {
      baseUrl: this.baseUrl,
      timeout: this.timeout,
      interceptors: this.interceptors,
    };
  }
}

// 使用示例
const api1 = new ApiManager();
const api2 = new ApiManager();

console.log("✓ api1 === api2:", api1 === api2);

// 只需要在一个地方配置，其他地方都能使用
api1.addRequestInterceptor((options) => {
  console.log("📋 请求拦截器运行：添加认证token");
});

api1.addResponseInterceptor((response) => {
  console.log("📋 响应拦截器运行：处理响应数据");
});

// 无论通过哪个引用发起请求，都会用同一套配置和拦截器
api2.request("/users/list");

console.log("\n配置信息:", api1.getConfig());

// ============================================================================
// 【小结】
// ============================================================================
console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                         总结与记忆技巧                              ║
╚════════════════════════════════════════════════════════════════════╝

【一句话记住单例模式】
"我只要一个，不要多个" 😄

【三个要素】
1. 私有化 - 外面无法直接创建实例
2. 静态方法或代理 - 提供获取实例的方式
3. 全局访问 - 保证随处可得唯一实例

【三个最常见的实现】
1. IIFE + 闭包 （传统、安全）
2. 构造函数 + 静态属性 （简单直观）
3. Proxy 代理 （现代优雅）

【前端应用】
- Redux/Vuex 的 Store
- 全局日志系统
- API 管理器
- 事件总线 (EventBus)
- 主题管理器
- 通知系统

【思考题】
1. 如果你要写一个全局的错误处理器，应该用单例吗？
   💡 是的，这样所有的错误都会集中到一个地方处理

2. 如果一个类既需要单例，又需要被继承怎么办？
   💡 可以用工厂模式配合单例

3. 单例和全局变量有什么区别？
   💡 单例通过类来管理，更规范；全局变量随意创建，容易污染

╔════════════════════════════════════════════════════════════════════╗
║                  祝贺！你已经掌握了单例模式 🎉                       ║
║     继续探索其他设计模式，成为优秀的前端工程师吧！                    ║
╚════════════════════════════════════════════════════════════════════╝
`);
