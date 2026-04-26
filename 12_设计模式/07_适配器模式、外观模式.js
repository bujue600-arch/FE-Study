/**
 * ==========================================
 * 适配器模式 & 外观模式 完全讲解
 * 为前端实习生精心准备的设计模式教程
 * ==========================================
 * 
 * 你是不是有过这样的经验：
 * 1. 买了个欧洲充电器，却用不了（接口不兼容）→ 需要转接器
 * 2. 到医院看病，从挂号、检查、交费...一堆复杂流程 → 有人帮你搞定
 * 
 * 这就是今天要学的两个模式的现实场景！
 */


/**
 * ============================================
 * 第一部分：适配器模式 (Adapter Pattern)
 * ============================================
 * 
 * 🎯 核心概念：
 * 将一个不兼容的接口转换成客户端期望的接口，
 * 使原本无法工作的两个类能够协作。
 * 
 * 生活中的例子：
 * - USB-C转接器
 * - 美标转中标的插头转换器
 * - 翻译（把英文转换成中文）
 * - 旅行时的电压转换器
 */

console.log('\n========== 适配器模式演示 ==========\n');

// =============================================
// 【场景1】第三方库的适配 - 最常见的前端场景
// =============================================
console.log('【场景1】第三方库接口不兼容的适配\n');

// 假设：我们的系统期望的是这样的用户信息格式
const ourSystemExpectedFormat = {
  userName: 'Tom',
  userEmail: 'tom@example.com',
  userAge: 25
};

// 现实中：第三方库返回的是这样的格式（字段名不同，这很常见！）
const thirdPartyLibraryData = {
  name: 'Tom',
  email: 'tom@example.com',
  age: 25
};

// ❌ 问题：字段名不匹配，直接用会出错
console.log('❌ 错误方式 - 字段名不匹配：');
try {
  console.log(thirdPartyLibraryData.userName); // undefined，出错！
} catch(e) {
  console.log('出错了！因为字段名不同');
}

// ✅ 解决方案：创建一个适配器，转换数据格式
function userAdapter(thirdPartyData) {
  // 这个函数就是"转接器"，负责把第三方数据转成我们需要的格式
  return {
    userName: thirdPartyData.name,      // name → userName
    userEmail: thirdPartyData.email,    // email → userEmail
    userAge: thirdPartyData.age         // age → userAge
  };
}

console.log('✅ 正确方式 - 使用适配器：');
const adaptedData = userAdapter(thirdPartyLibraryData);
console.log('适配后的数据：', adaptedData);
console.log('现在能访问 userName：', adaptedData.userName);

// =============================================
// 【场景2】类适配器 - 使用类来实现（更优雅）
// =============================================
console.log('\n【场景2】使用类实现的适配器模式\n');

// 旧系统的支付类（我们不能改它）
class OldPaymentSystem {
  pay(amount) {
    return `老系统支付了 ${amount} 元`;
  }
}

// 新系统期望的支付接口（新API）
// 客户端代码期望调用这样的接口
const newSystemExpectedPaymentAPI = (paymentHandler) => {
  const result = paymentHandler.processPayment(100);
  console.log(result);
};

// ❌ 直接用旧系统会出错
console.log('❌ 错误方式 - 新系统期望 processPayment 方法：');
try {
  const oldSystem = new OldPaymentSystem();
  newSystemExpectedPaymentAPI(oldSystem); // 出错！oldSystem 没有 processPayment 方法
} catch(e) {
  console.log('错误：processPayment is not a function');
}

// ✅ 创建一个适配器类，让旧系统和新系统兼容
class PaymentAdapter {
  constructor(oldPaymentSystem) {
    this.oldPaymentSystem = oldPaymentSystem;
  }

  // 这是新系统期望的接口
  processPayment(amount) {
    // 在内部调用旧系统的 pay 方法
    return this.oldPaymentSystem.pay(amount);
  }
}

console.log('✅ 正确方式 - 使用适配器类：');
const oldSystem = new OldPaymentSystem();
const adaptedPayment = new PaymentAdapter(oldSystem);
newSystemExpectedPaymentAPI(adaptedPayment);

// =============================================
// 【场景3】多个不兼容库的适配 - 真实业务中很常见
// =============================================
console.log('\n【场景3】适配多个数据源（数据库、API、本地存储）\n');

// 我们的应用期望这样的用户数据接口
class UserService {
  getUser(id) {
    throw new Error('必须实现 getUser 方法');
  }
  
  getUserList() {
    throw new Error('必须实现 getUserList 方法');
  }
}

// 数据源1：MySQL 数据库（返回 userId, userFullName, userPhone）
const mysqlDatabase = {
  findUser(userId) {
    return { userId: 1, userFullName: '张三', userPhone: '18888888888' };
  },
  findAllUsers() {
    return [
      { userId: 1, userFullName: '张三', userPhone: '18888888888' },
      { userId: 2, userFullName: '李四', userPhone: '19999999999' }
    ];
  }
};

// 数据源2：REST API（返回 id, name, phone）
const restAPI = {
  get(id) {
    return { id: 1, name: '张三', phone: '18888888888' };
  },
  getAll() {
    return [
      { id: 1, name: '张三', phone: '18888888888' },
      { id: 2, name: '李四', phone: '19999999999' }
    ];
  }
};

// 数据源3：本地存储（返回 u_id, u_name, u_tel）
const localStorage = {
  getItem(id) {
    return { u_id: 1, u_name: '张三', u_tel: '18888888888' };
  },
  getAllItems() {
    return [
      { u_id: 1, u_name: '张三', u_tel: '18888888888' },
      { u_id: 2, u_name: '李四', u_tel: '19999999999' }
    ];
  }
};

// 为 MySQL 创建适配器
class MysqlAdapter extends UserService {
  constructor(database) {
    super();
    this.database = database;
  }

  getUser(id) {
    const data = this.database.findUser(id);
    // 转换字段名为统一格式：id, name, phone
    return {
      id: data.userId,
      name: data.userFullName,
      phone: data.userPhone
    };
  }

  getUserList() {
    return this.database.findAllUsers().map(user => ({
      id: user.userId,
      name: user.userFullName,
      phone: user.userPhone
    }));
  }
}

// 为 REST API 创建适配器
class RestApiAdapter extends UserService {
  constructor(api) {
    super();
    this.api = api;
  }

  getUser(id) {
    // REST API 返回的格式已经比较接近，只需要简单映射
    return this.api.get(id);
  }

  getUserList() {
    return this.api.getAll();
  }
}

// 为本地存储创建适配器
class LocalStorageAdapter extends UserService {
  constructor(storage) {
    super();
    this.storage = storage;
  }

  getUser(id) {
    const data = this.storage.getItem(id);
    // 转换字段名为统一格式
    return {
      id: data.u_id,
      name: data.u_name,
      phone: data.u_tel
    };
  }

  getUserList() {
    return this.storage.getAllItems().map(user => ({
      id: user.u_id,
      name: user.u_name,
      phone: user.u_tel
    }));
  }
}

// 现在，无论我们使用哪个数据源，接口都是统一的！
const userServiceFromMysql = new MysqlAdapter(mysqlDatabase);
const userServiceFromApi = new RestApiAdapter(restAPI);
const userServiceFromStorage = new LocalStorageAdapter(localStorage);

// 统一的使用方式
console.log('从 MySQL 获取用户：', userServiceFromMysql.getUser(1));
console.log('从 REST API 获取用户：', userServiceFromApi.getUser(1));
console.log('从本地存储获取用户：', userServiceFromStorage.getUser(1));

console.log('\n获取所有用户（MySQL）：', userServiceFromMysql.getUserList());

// =============================================
// 【场景4】函数式适配器 - 更简洁的方式
// =============================================
console.log('\n【场景4】函数式适配器（前端推荐）\n');

// 第三方日期库：moment.js 返回的是 moment 对象
const momentLibrary = {
  now() {
    return {
      year: 2024,
      month: 3,
      day: 26,
      format: () => '2024-03-26'
    };
  }
};

// 我们需要的格式：纯对象 { date: '2024-03-26', timestamp: ... }
const momentAdapter = (momentObj) => ({
  date: momentObj.format(),
  timestamp: new Date(`${momentObj.year}-${String(momentObj.month).padStart(2, '0')}-${String(momentObj.day).padStart(2, '0')}`).getTime()
});

const standardDate = momentAdapter(momentLibrary.now());
console.log('适配后的日期格式：', standardDate);




/**
 * ============================================
 * 第二部分：外观模式 (Facade Pattern)
 * ============================================
 * 
 * 🎯 核心概念：
 * 为一个复杂的子系统提供一个统一的简单接口，
 * 隐藏系统的复杂性，让客户端更容易使用。
 * 
 * 生活中的例子：
 * - 医院前台：你只需告诉前台"我要看医生"，
 *   他们帮你挂号、安排科室、处理各种复杂手续
 * - 汽车启动：按一个按钮，背后启动了
 *   引擎系统、点火系统、燃油系统等
 * - jQuery 或 React 框架：隐藏了 DOM 操作的复杂性
 */

console.log('\n\n========== 外观模式演示 ==========\n');

// =============================================
// 【场景1】计算机启动 - 经典的外观模式例子
// =============================================
console.log('【场景1】计算机启动系统\n');

// 复杂的子系统：各个硬件部分
class CPUSubsystem {
  start() {
    console.log('  ✓ CPU 已启动');
    return true;
  }
}

class MemorySubsystem {
  start() {
    console.log('  ✓ 内存已初始化');
    return true;
  }
}

class DiskSubsystem {
  start() {
    console.log('  ✓ 磁盘已加载');
    return true;
  }
}

class NetworkSubsystem {
  start() {
    console.log('  ✓ 网络已连接');
    return true;
  }
}

// ❌ 如果没有外观模式，客户端需要这样操作（很复杂！）
console.log('❌ 如果没有外观模式 - 需要手动启动各个系统：\n');
const cpu = new CPUSubsystem();
const memory = new MemorySubsystem();
const disk = new DiskSubsystem();
const network = new NetworkSubsystem();

cpu.start();
memory.start();
disk.start();
network.start();
console.log('电脑启动完成\n');

// ✅ 使用外观模式 - 提供一个统一的接口
console.log('✅ 使用外观模式 - 只需调用一个接口：\n');

class ComputerFacade {
  constructor() {
    this.cpu = new CPUSubsystem();
    this.memory = new MemorySubsystem();
    this.disk = new DiskSubsystem();
    this.network = new NetworkSubsystem();
  }

  // 这个方法就是"外观"，隐藏了所有复杂的启动逻辑
  startup() {
    console.log('正在启动电脑...\n');
    this.cpu.start();
    this.memory.start();
    this.disk.start();
    this.network.start();
    console.log('✨ 电脑启动完成！');
  }

  // 类似地，关机也很复杂，但外观隐藏了它
  shutdown() {
    console.log('正在关闭电脑...\n');
    console.log('  ✓ CPU 已关闭');
    console.log('  ✓ 内存已清空');
    console.log('  ✓ 磁盘已卸载');
    console.log('  ✓ 网络已断开');
    console.log('✨ 电脑关机完成！');
  }
}

const myComputer = new ComputerFacade();
myComputer.startup();
myComputer.shutdown();

// =============================================
// 【场景2】DOM 操作的简化 - 前端实际应用
// =============================================
console.log('\n【场景2】DOM 操作简化（jQuery 的思想）\n');

// 复杂的原生 DOM 操作
console.log('❌ 原生 DOM 操作（很繁琐）：\n');

// 模拟原生 DOM API
const nativeDOMAPI = {
  getElementById: (id) => ({ id, className: '', innerHTML: '', style: {} }),
  createElement: (tag) => ({ tag, className: '', innerHTML: '', addEventListener() {} }),
  addEventListener: () => console.log('  添加事件监听器...'),
  addClass: () => console.log('  添加 class...'),
  setText: () => console.log('  设置文本内容...')
};

console.log('// 原生方式 - 重复代码很多：');
console.log(`const btn = document.getElementById('myBtn');
btn.addEventListener('click', () => {
  btn.classList.add('active');
  btn.textContent = '已点击';
});
// 还需要处理各种浏览器兼容性问题...
`);

// ✅ 使用外观模式简化（就像 jQuery 做的那样）
console.log('✅ 使用外观模式简化（类似 jQuery）：\n');

class DOMFacade {
  constructor(selector) {
    this.element = document.querySelector(selector) || 
                   { className: '', innerHTML: '', addEventListener() {} };
  }

  // 外观：简化的事件绑定
  on(eventName, callback) {
    this.element.addEventListener(eventName, callback);
    return this;
  }

  // 外观：简化的样式添加
  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  // 外观：简化的文本设置
  text(content) {
    this.element.textContent = content;
    return this;
  }

  // 外观：简化的 HTML 设置
  html(content) {
    this.element.innerHTML = content;
    return this;
  }

  // 外观：链式调用支持
  show() {
    this.element.style.display = 'block';
    return this;
  }

  hide() {
    this.element.style.display = 'none';
    return this;
  }
}

// 现在可以这样简洁地使用
console.log('// 简化后的方式 - 链式调用：');
console.log(`const \$ = (selector) => new DOMFacade(selector);

\$('#myBtn')
  .on('click', () => {
    \$('#myBtn').addClass('active').text('已点击');
  })
  .show();
`);

// =============================================
// 【场景3】网络请求的外观 - 非常实用的前端场景
// =============================================
console.log('\n【场景3】网络请求和错误处理的外观\n');

// 底层复杂的子系统：各种网络操作
class HttpClient {
  get(url) {
    console.log('  执行 GET 请求：' + url);
    return { data: 'response' };
  }

  post(url, data) {
    console.log('  执行 POST 请求：' + url);
    return { data: 'response' };
  }

  put(url, data) {
    console.log('  执行 PUT 请求：' + url);
    return { data: 'response' };
  }

  delete(url) {
    console.log('  执行 DELETE 请求：' + url);
    return { data: 'response' };
  }
}

class ErrorHandler {
  handle(error) {
    console.log('  处理错误：' + error);
  }
}

class CacheManager {
  get(key) {
    console.log('  检查缓存：' + key);
    return null;
  }

  set(key, value) {
    console.log('  保存到缓存：' + key);
  }
}

// ❌ 如果没有外观，每个请求都需要这样处理
console.log('❌ 没有外观模式 - 每次请求都很复杂：\n');
const client = new HttpClient();
const errorHandler = new ErrorHandler();
const cache = new CacheManager();

console.log('获取用户列表（没有外观）：');
try {
  let data = cache.get('users');
  if (!data) {
    data = client.get('/api/users');
    cache.set('users', data);
  }
  console.log('  结果：', data);
} catch(e) {
  errorHandler.handle(e);
}

// ✅ 使用外观模式 - 一行代码搞定
console.log('\n✅ 使用外观模式 - 简洁优雅：\n');

class APIFacade {
  constructor() {
    this.httpClient = new HttpClient();
    this.errorHandler = new ErrorHandler();
    this.cache = new CacheManager();
  }

  // 这个外观隐藏了所有复杂的逻辑
  async get(endpoint, options = {}) {
    const { useCache = true } = options;

    try {
      // 1. 先检查缓存
      if (useCache) {
        const cachedData = this.cache.get(endpoint);
        if (cachedData) {
          console.log(`获取用户列表（来自缓存）：`);
          console.log('  结果：', cachedData);
          return cachedData;
        }
      }

      // 2. 发送请求
      console.log(`获取用户列表（来自网络）：`);
      const data = this.httpClient.get(endpoint);

      // 3. 保存到缓存
      if (useCache) {
        this.cache.set(endpoint, data);
      }

      return data;
    } catch(e) {
      this.errorHandler.handle(e);
      throw e;
    }
  }

  async post(endpoint, data, options = {}) {
    try {
      console.log(`创建资源：`);
      return this.httpClient.post(endpoint, data);
    } catch(e) {
      this.errorHandler.handle(e);
      throw e;
    }
  }

  async put(endpoint, data, options = {}) {
    try {
      console.log(`更新资源：`);
      return this.httpClient.put(endpoint, data);
    } catch(e) {
      this.errorHandler.handle(e);
      throw e;
    }
  }

  async delete(endpoint, options = {}) {
    try {
      console.log(`删除资源：`);
      return this.httpClient.delete(endpoint);
    } catch(e) {
      this.errorHandler.handle(e);
      throw e;
    }
  }
}

const api = new APIFacade();
api.get('/api/users');
api.post('/api/users', { name: 'Tom' });
api.put('/api/users/1', { name: 'Jerry' });
api.delete('/api/users/1');

// =============================================
// 【场景4】表单验证的外观 - 常见的前端业务
// =============================================
console.log('\n【场景4】表单验证和提交的外观\n');

// 各种验证规则（复杂的子系统）
class EmailValidator {
  validate(email) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    console.log(`  验证邮箱 ${email}：${isValid ? '✓' : '✗'}`);
    return isValid;
  }
}

class PasswordValidator {
  validate(password) {
    const isValid = password.length >= 8;
    console.log(`  验证密码长度（≥8位）：${isValid ? '✓' : '✗'}`);
    return isValid;
  }
}

class PhoneValidator {
  validate(phone) {
    const isValid = /^1[3-9]\d{9}$/.test(phone);
    console.log(`  验证手机号：${isValid ? '✓' : '✗'}`);
    return isValid;
  }
}

// ❌ 没有外观，验证逻辑分散在各处
console.log('❌ 没有外观模式 - 验证代码散落各地：\n');
const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const phoneValidator = new PhoneValidator();

console.log('手动验证表单（散落的逻辑）：');
let isEmailValid = emailValidator.validate('user@example.com');
let isPasswordValid = passwordValidator.validate('password123');
let isPhoneValid = phoneValidator.validate('13800138000');
const allValid = isEmailValid && isPasswordValid && isPhoneValid;
console.log(`整体验证结果：${allValid ? '✓ 可以提交' : '✗ 有错误'}\n`);

// ✅ 使用外观模式 - 统一的验证接口
console.log('✅ 使用外观模式 - 统一的验证接口：\n');

class FormValidationFacade {
  constructor() {
    this.emailValidator = new EmailValidator();
    this.passwordValidator = new PasswordValidator();
    this.phoneValidator = new PhoneValidator();
  }

  // 这个外观隐藏了所有验证细节
  validateRegistrationForm(formData) {
    console.log('开始验证注册表单...\n');

    const results = {
      email: this.emailValidator.validate(formData.email),
      password: this.passwordValidator.validate(formData.password),
      phone: this.phoneValidator.validate(formData.phone)
    };

    const isValid = Object.values(results).every(result => result === true);
    console.log(`\n整体验证结果：${isValid ? '✓ 所有字段有效，可以提交' : '✗ 存在无效字段'}\n`);

    return isValid;
  }
}

const formValidator = new FormValidationFacade();
const formData = {
  email: 'user@example.com',
  password: 'password123',
  phone: '13800138000'
};

formValidator.validateRegistrationForm(formData);




/**
 * ============================================
 * 总结与对比
 * ============================================
 */

console.log('\n【总结】适配器模式 vs 外观模式\n');

console.log(`
┌─────────────────────────────────────────────────────────────────┐
│                   适配器模式 vs 外观模式                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 适配器模式（Adapter）：                                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 目的：兼容性，让不兼容的接口变得兼容                         │ │
│ │ 比喻：转接器、转换器、翻译                                   │ │
│ │ 结构：1对1，一个适配器对应一个不兼容的接口                  │ │
│ │ 关键字：转换、适配、兼容                                     │ │
│ │                                                             │ │
│ │ 适用场景：                                                  │ │
│ │ ✓ 集成第三方库但接口不匹配                                  │ │
│ │ ✓ 旧系统升级，需要保持向后兼容                              │ │
│ │ ✓ 多个数据源，格式不统一                                    │ │
│ │ ✓ 使用不同的 API 标准（如 callback vs Promise）             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ 外观模式（Facade）：                                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 目的：简化，为复杂子系统提供简单接口                         │ │
│ │ 比喻：前台、医院挂号、遥控器                                 │ │
│ │ 结构：1对多，一个外观对应多个复杂的子系统                    │ │
│ │ 关键字：简化、统一入口、隐藏复杂性                           │ │
│ │                                                             │ │
│ │ 适用场景：                                                  │ │
│ │ ✓ 简化复杂的 API 调用流程                                   │ │
│ │ ✓ 隐藏系统的复杂实现细节                                    │ │
│ │ ✓ 为不同的使用者提供不同层级的接口                          │ │
│ │ ✓ 解耦客户端与复杂子系统                                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ 🎯 核心区别：                                                     │
│ • 适配器：解决「我和他不兼容」的问题 → 让他变成我能用的样子      │
│ • 外观：解决「这太复杂了」的问题 → 把复杂的事情简单化           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
`);

console.log('\n【常见问题解答】\n');

console.log(`
Q1: 为什么我们需要这两个模式？
A1: 
  • 适配器：真实世界的接口标准很多，我们需要让它们协作
  • 外观：复杂性是代码最大的敌人，外观帮我们隐藏它

Q2: 前端工作中哪个更常用？
A2:
  • 适配器：非常常用！处理各种第三方库和 API
  • 外观：也很常用！简化业务逻辑和框架层的接口

Q3: 这和简单的「函数包装」有什么区别？
A3:
  • 设计模式是有目的的结构化包装
  • 简单包装可能有，但缺乏设计的完整性和可维护性

Q4: 为什么不能把两个模式的功能合到一个类里？
A4:
  • 单一职责原则：一个类做一件事
  • 适配器专注于兼容性，外观专注于简化
  • 混合会导致类变得太复杂、难以维护
`);

console.log('\n【实战建议】\n');

console.log(`
✅ 何时使用适配器模式：
1. 发现字段名不匹配、方法名不匹配 → 创建适配器
2. 使用第三方库，但 API 不符合项目规范 → 创建适配器
3. 多个数据源格式不统一 → 为每个源创建适配器
4. 新旧版本 API 需要并存 → 用适配器桥接

✅ 何时使用外观模式：
1. 发现业务逻辑中有大量重复的初始化、配置代码 → 创建外观
2. 需要向客户端隐藏复杂的实现细节 → 创建外观
3. 多个子系统需要按特定顺序调用 → 创建外观来协调
4. 想要为不同的使用者提供不同层级的接口 → 创建多个外观

✅ 前端开发中的实际应用：
• 适配器：
  - 处理不同浏览器的 API 差异
  - 统一处理 axios、fetch、$.ajax 的不同 API
  - 处理来自不同后端的数据格式
  
• 外观：
  - 封装复杂的 DOM 操作（如 jQuery）
  - 简化状态管理的使用（如 Redux、Vuex）
  - 提供简单的插件初始化接口
`);

console.log('\n【写在最后】\n');

console.log(`
同学，学设计模式的关键是：
1. 理解模式解决的「真实问题」
2. 看看生活中有哪些类似的例子
3. 在实际代码中识别出这些问题
4. 恰当地应用模式解决问题

不要为了用模式而用模式，这样会让代码变复杂。
要在感受到痛点时，才使用模式来解决。

加油！相信你很快就能成为一名优秀的前端工程师！🚀
`);
