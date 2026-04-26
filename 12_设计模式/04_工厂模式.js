/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║                   工厂模式完整讲解与实战课程                      ║
 * ╚════════════════════════════════════════════════════════════════╝
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 场景：假设我们要做一个"用户身份系统"
// 有学生、老师、管理员三种不同的用户类型
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("═══════ 第一部分：没有工厂模式时的问题 ═══════\n");

// 方式1：直接创建对象 ❌ 这样做有什么问题呢？

class Student {
  constructor(name) {
    this.name = name;
    this.role = "student";
    this.permissions = ["做题", "提交作业"];
  }
}

class Teacher {
  constructor(name) {
    this.name = name;
    this.role = "teacher";
    this.permissions = ["出题", "批改作业", "发布成绩"];
  }
}

class Admin {
  constructor(name) {
    this.name = name;
    this.role = "admin";
    this.permissions = ["管理用户", "查看数据", "系统配置"];
  }
}

// 这时候，如果你要创建用户，需要这样做：
// 问题出现了！👇
const user1 = new Student("小张");
const user2 = new Teacher("李老师");
const user3 = new Admin("王管理员");

console.log("❌ 问题1：代码分散，如果有10种用户类型，要创建10个类");
console.log("❌ 问题2：使用者（调用者）需要知道每个类怎么创建，太麻烦！");
console.log("❌ 问题3：如果要改创建逻辑，要改很多地方");
console.log("❌ 问题4：代码耦合度高，后期维护困难\n");

// 有没有更好的办法呢？请看第二部分 👇

console.log("\n═══════ 第二部分：简单工厂模式 (Simple Factory) ═══════\n");

/**
 * 💡 核心思想：
 * 创建一个"工厂"，所有的对象创建都交给它
 * 使用者只需要告诉工厂"我要什么"，工厂就给你做好！
 */

// 定义用户类（同上）
class StudentUser {
  constructor(name) {
    this.name = name;
    this.role = "student";
    this.permissions = ["做题", "提交作业"];
  }

  study() {
    console.log(`${this.name}正在学习...`);
  }
}

class TeacherUser {
  constructor(name) {
    this.name = name;
    this.role = "teacher";
    this.permissions = ["出题", "批改作业", "发布成绩"];
  }

  gradeWork() {
    console.log(`${this.name}正在批改作业...`);
  }
}

class AdminUser {
  constructor(name) {
    this.name = name;
    this.role = "admin";
    this.permissions = ["管理用户", "查看数据", "系统配置"];
  }

  manageUsers() {
    console.log(`${this.name}正在管理系统...`);
  }
}

// ✨ 关键：创建一个"工厂" - 简单工厂函数
function userFactory(type, name) {
  if (type === "student") {
    return new StudentUser(name);
  } else if (type === "teacher") {
    return new TeacherUser(name);
  } else if (type === "admin") {
    return new AdminUser(name);
  }
  throw new Error("未知的用户类型");
}

// 现在，使用者只需要这样调用 ✅
const student = userFactory("student", "小王");
const teacher = userFactory("teacher", "李老师");
const admin = userFactory("admin", "张管理员");

console.log("✅ 使用工厂后：");
console.log("学生信息:", student);
console.log("老师信息:", teacher);
console.log("管理员信息:", admin);

// 这样有什么好处？
console.log("\n✨ 简单工厂的优点：");
console.log("1. 使用者不需要知道具体创建细节，只需调用 userFactory()");
console.log("2. 所有的创建逻辑集中在一个函数，容易维护");
console.log("3. 如果要改变创建逻辑，只需要改工厂函数");
student.study();
teacher.gradeWork();
admin.manageUsers();

console.log("\n═══════ 第三部分：简单工厂的问题 & 工厂方法模式 ═══════\n");

/**
 * 简单工厂的不足：
 * ❌ 如果要添加一个新的用户类型（比如"游客"），需要改工厂函数
 * ❌ 这违反了"开闭原则"（对扩展开放，对修改关闭）
 * ❌ 工厂函数会越来越庞大
 *
 * 💡 解决方案：使用"工厂方法模式"
 */

console.log("💭 假设现在要添加一个新的用户类型：Guest（游客）");
console.log("这时候，我们需要改工厂函数...\n");

// 方式一：改工厂函数 ❌ 不好的做法
// function userFactory(type, name) {
//   if (type === 'student') {
//     return new StudentUser(name);
//   } else if (type === 'teacher') {
//     return new TeacherUser(name);
//   } else if (type === 'admin') {
//     return new AdminUser(name);
//   } else if (type === 'guest') {   // ❌ 要修改工厂函数！
//     return new GuestUser(name);
//   }
//   throw new Error('未知的用户类型');
// }

// 方式二：使用工厂方法模式 ✅ 更优雅的做法

console.log("✨ 工厂方法模式（Factory Method Pattern）：\n");

// 第1步：定义一个基类/基接口（用对象来模拟）
class UserFactory {
  // 这是一个抽象工厂，定义工厂应该做什么
  create(name) {
    throw new Error("子类必须实现 create 方法");
  }
}

// 第2步：为每种用户类型创建对应的工厂类
class StudentFactory extends UserFactory {
  create(name) {
    return new StudentUser(name);
  }
}

class TeacherFactory extends UserFactory {
  create(name) {
    return new TeacherUser(name);
  }
}

class AdminFactory extends UserFactory {
  create(name) {
    return new AdminUser(name);
  }
}

// 第3步：当要添加新类型时，只需要：
// ✨ 1. 创建新的用户类
class GuestUser {
  constructor(name) {
    this.name = name;
    this.role = "guest";
    this.permissions = ["浏览内容"];
  }

  browse() {
    console.log(`${this.name}正在浏览...`);
  }
}

// ✨ 2. 创建对应的工厂
class GuestFactory extends UserFactory {
  create(name) {
    return new GuestUser(name);
  }
}

// 这样，原来的代码不需要改！✅
console.log("✅ 使用工厂方法：\n");

const studentFactory = new StudentFactory();
const teacherFactory = new TeacherFactory();
const adminFactory = new AdminFactory();
const guestFactory = new GuestFactory();

const student2 = studentFactory.create("张三");
const teacher2 = teacherFactory.create("王老师");
const admin2 = adminFactory.create("李管理员");
const guest = guestFactory.create("匿名游客");

console.log("学生:", student2);
console.log("老师:", teacher2);
console.log("管理员:", admin2);
console.log("游客:", guest);

guest.browse();

console.log("\n✨ 工厂方法模式的优点：");
console.log('1. 符合"开闭原则" - 对扩展开放，对修改关闭');
console.log("2. 每个工厂类只负责创建一种对象");
console.log("3. 添加新类型时，只需创建新的工厂类，不需要改原代码");
console.log("4. 代码更容易扩展和维护");

console.log("\n═══════ 第四部分：在前端的实际应用例子 ═══════\n");

/**
 * 现实场景：创建不同的HTTP请求对象
 */

// 定义请求类
class AjaxRequest {
  send(url) {
    console.log(`使用 AJAX 发送请求: ${url}`);
  }
}

class FetchRequest {
  send(url) {
    console.log(`使用 Fetch API 发送请求: ${url}`);
  }
}

class AxiosRequest {
  send(url) {
    console.log(`使用 Axios 发送请求: ${url}`);
  }
}

// 简单工厂
function requestFactory(type) {
  if (type === "ajax") return new AjaxRequest();
  if (type === "fetch") return new FetchRequest();
  if (type === "axios") return new AxiosRequest();
}

console.log("💻 前端实际例子1：HTTP请求工厂\n");
const ajaxRequest = requestFactory("ajax");
ajaxRequest.send("https://api.example.com/data");

const fetchRequest = requestFactory("fetch");
fetchRequest.send("https://api.example.com/data");

console.log("\n═══════ 第五部分：工厂模式的应用场景总结 ═══════\n");

console.log(`
📌 什么时候应该用工厂模式？

1. 对象的创建比较复杂
   → 比如 new User() 需要很多初始化参数

2. 对象有多种类型，需要判断
   → 比如根据用户类型创建不同的对象

3. 需要集中管理对象的创建
   → 比如统计创建了多少个对象

4. 希望代码易于扩展
   → 添加新类型时，不需要改原有的代码

═══════════════════════════════════════════

📌 前端中的工厂模式应用：

✓ UI 组件库 - 根据不同的配置创建不同的组件
✓ 路由工厂 - 根据路径创建不同的页面
✓ 数据库连接 - 不同的数据库创建不同的连接
✓ 支付方式 - 支付宝、微信、银行卡等不同支付方式
✓ 图表库 - 根据类型创建不同的图表（柱状图、饼图等）

═══════════════════════════════════════════

⚠️  要注意的是：

1. 不要过度使用 - 简单对象直接 new 就行
2. 工厂方法模式比简单工厂更复杂，需要权衡
3. 现在 React 组件、Vue 插件等已经是"工厂"思想了
`);

console.log("\n═══════ 第六部分：练习题 & 深入理解 ═══════\n");

/**
 * 思考题：
 * 1. 简单工厂和工厂方法的区别是什么？
 * 2. 为什么说工厂模式符合"开闭原则"？
 * 3. React 中的 React.createElement 是不是工厂模式的应用？
 *
 * 答案在下面👇
 */

console.log(`
思考题解析：

Q1: 简单工厂 vs 工厂方法
┌─────────────────────────────────────────────┐
│ 简单工厂：                                    │
│ - 一个工厂函数创建所有对象                     │
│ - 简单，但工厂函数会很大                      │
│ - 添加新类型需要改工厂函数 ❌                 │
│                                             │
│ 工厂方法：                                   │
│ - 每个对象类型对应一个工厂类                   │
│ - 复杂一点，但易于扩展 ✅                     │
│ - 添加新类型只需新建工厂类                     │
└─────────────────────────────────────────────┘

Q2: 为什么符合"开闭原则"？
- 开：对新增类型开放（新建工厂类，不改原代码）
- 闭：对修改关闭（原有代码保持不变）

Q3: React.createElement 是工厂吗？
- 是的！它根据不同的组件类型创建不同的虚拟DOM
- React.createElement('div', props, children)
- React.createElement(MyComponent, props, children)
- 这就是工厂模式的完美应用！
`);

console.log("\n═══════ 总结：一图胜千言 ═══════\n");

console.log(`
🏭 工厂模式流程图：

没有工厂：
  需要 Student → 直接 new Student()
  需要 Teacher → 直接 new Teacher()
  需要 Admin   → 直接 new Admin()
  ❌ 使用者需要知道每个类

使用工厂：
  需要什么类型 → 告诉工厂 → 工厂帮你创建
  ✅ 使用者不需要知道具体细节

┌──────────────┐
│   使用者      │
└──────┬───────┘
       │ 需要用户对象
       │
┌──────▼──────────────┐
│   工厂（Factory）    │
│ ├─ create('student')│
│ ├─ create('teacher')│
│ └─ create('admin')  │
└──────┬──────────────┘
       │
    ┌──┴──┬─────┬──────┐
    ▼     ▼     ▼      ▼
  Student Teacher Admin Guest
  对象    对象   对象   对象

🎯 核心理念：
创建对象的过程，交给专门的工厂来处理！
这样就像你去麦当劳点餐一样简单！
`);
