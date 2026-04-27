/**
 * 模板方法模式 (Template Method Pattern)
 * 
 * 核心思想：
 * - 定义一个操作中的算法框架（骨架）
 * - 将一些步骤延迟到子类中实现
 * - 让子类在不改变算法结构的前提下，重新定义算法中的某些步骤
 * 
 * 简单来说：父类定义流程，子类实现细节
 */

// ============ 例子1：做饭的流程（最通俗易懂）============

console.log('=== 例子1：做饭流程 ===\n');

// 父类：定义做饭的模板
class Cook {
  // 这是模板方法 - 定义了做饭的整个流程
  makeFood() {
    this.prepareMaterials();      // 第1步：准备材料
    this.cook();                  // 第2步：烹饪（具体方式由子类决定）
    this.plating();               // 第3步：装盘
    this.serve();                 // 第4步：上菜
  }

  // 所有菜都需要的通用步骤
  prepareMaterials() {
    console.log('📦 清洗材料、切菜、准备调料');
  }

  // 这个方法很重要！它是空的，期望子类去实现
  // 这就是"钩子方法"（Hook Method）
  cook() {
    console.log('❌ 子类必须实现cook()方法！');
  }

  plating() {
    console.log('🍽️ 把菜装进盘子');
  }

  serve() {
    console.log('👨‍🍳 开饭咯！\n');
  }
}

// 子类1：做炒菜
class FriedRice extends Cook {
  cook() {
    console.log('🔥 大火炒米饭，加入鸡蛋和葱');
  }
}

// 子类2：做番茄鸡蛋汤
class TomatoEggSoup extends Cook {
  cook() {
    console.log('🍅 先炒番茄，加水煮，打入蛋花');
  }
}

// 使用
const friedRice = new FriedRice();
console.log('👨‍🍳 做炒饭：');
friedRice.makeFood();

const soup = new TomatoEggSoup();
console.log('👨‍🍳 做番茄鸡蛋汤：');
soup.makeFood();


// ============ 例子2：前端实际场景 - 组件生命周期 ============

console.log('\n=== 例子2：前端组件的生命周期（React/Vue思想）===\n');

class Component {
  // 模板方法：组件生命周期流程
  mount() {
    this.beforeMount();    // 挂载前
    this.create();         // 创建组件逻辑（由子类实现）
    this.afterMount();     // 挂载后
  }

  beforeMount() {
    console.log('📋 组件挂载前：准备初始数据、注册事件监听');
  }

  // 这个方法由子类实现
  create() {
    console.log('❌ 子类必须实现create()！');
  }

  afterMount() {
    console.log('✅ 组件挂载完成：可以访问DOM、获取数据');
  }
}

class LoginComponent extends Component {
  create() {
    console.log('🔐 创建登录表单，设置验证规则');
  }
}

class ProductListComponent extends Component {
  create() {
    console.log('📦 创建产品列表，请求后端数据');
  }
}

// 使用
const login = new LoginComponent();
console.log('【登录组件】：');
login.mount();

const productList = new ProductListComponent();
console.log('\n【产品列表组件】：');
productList.mount();


// ============ 例子3：数据处理流程（真实开发场景）============

console.log('\n=== 例子3：处理用户数据流程 ===\n');

class DataProcessor {
  // 模板方法：数据处理的完整流程
  process(data) {
    console.log('1️⃣ 开始处理数据...');
    
    const validated = this.validate(data);      // 验证
    if (!validated) {
      console.log('❌ 数据验证失败！');
      return;
    }

    const transformed = this.transform(data);   // 转换（子类实现）
    const result = this.save(transformed);      // 保存
    
    this.log(result);                           // 记录日志
    return result;
  }

  validate(data) {
    console.log('✓ 验证数据格式...');
    return true;
  }

  transform(data) {
    console.log('❌ 子类必须实现transform()！');
    return data;
  }

  save(data) {
    console.log('💾 保存到数据库...');
    return data;
  }

  log(result) {
    console.log('📝 记录日志完成\n');
  }
}

// 子类1：处理用户注册数据
class UserRegistrationProcessor extends DataProcessor {
  transform(data) {
    console.log('✓ 用户数据转换：加密密码、添加创建时间');
    return {
      ...data,
      password: '***encrypted***',
      createdAt: new Date().toISOString()
    };
  }
}

// 子类2：处理订单数据
class OrderProcessor extends DataProcessor {
  transform(data) {
    console.log('✓ 订单数据转换：计算总价、添加订单号');
    return {
      ...data,
      orderId: 'ORD' + Date.now(),
      total: data.items.length * 100
    };
  }
}

// 使用
const userProcessor = new UserRegistrationProcessor();
console.log('【注册用户】：');
userProcessor.process({ username: 'xiaoming', password: '123456' });

const orderProcessor = new OrderProcessor();
console.log('【处理订单】：');
orderProcessor.process({ items: ['apple', 'banana', 'orange'] });


// ============ 例子4：带钩子方法的高级用法 ============

console.log('\n=== 例子4：钩子方法 - 更灵活的控制 ===\n');

class AdvancedCook {
  makeFood() {
    this.prepareMaterials();
    
    // 问：需要开火吗？
    if (this.needFire()) {
      this.turnOnFire();
    }
    
    this.cook();
    
    // 问：需要调味吗？
    if (this.needSeasoning()) {
      this.addSeasoning();
    }
    
    this.plating();
  }

  prepareMaterials() {
    console.log('📦 准备材料');
  }

  // 钩子方法1：默认需要开火
  needFire() {
    return true;
  }

  turnOnFire() {
    console.log('🔥 开火');
  }

  cook() {
    console.log('🍳 烹饪中...');
  }

  // 钩子方法2：默认需要调味
  needSeasoning() {
    return true;
  }

  addSeasoning() {
    console.log('🧂 加盐和酱油');
  }

  plating() {
    console.log('🍽️ 装盘\n');
  }
}

// 子类1：沙拉（不需要开火，需要调味）
class SaladCook extends AdvancedCook {
  needFire() {
    return false;  // 沙拉不需要开火
  }

  cook() {
    console.log('🥬 混合各种蔬菜和配菜');
  }
}

// 子类2：冰淇淋（不需要开火，不需要调味）
class IcecreamCook extends AdvancedCook {
  needFire() {
    return false;
  }

  needSeasoning() {
    return false;
  }

  cook() {
    console.log('❄️ 冷冻混合物');
  }
}

const salad = new SaladCook();
console.log('【沙拉】：');
salad.makeFood();

const icecream = new IcecreamCook();
console.log('【冰淇淋】：');
icecream.makeFood();


// ============ 总结 ============

console.log(`
╔════════════════════════════════════════════════════════════╗
║             模板方法模式 - 核心要点总结                    ║
╚════════════════════════════════════════════════════════════╝

✨ 什么时候用？
  • 多个类有相同的业务流程，但实现细节不同
  • 想要避免重复代码（复用流程框架）
  • 需要规范某个过程，让子类按规则实现

🎯 优点：
  ✓ 提高代码复用性
  ✓ 统一算法框架，规范具体实现
  ✓ 便于维护和扩展

⚠️  缺点：
  ✗ 需要继承（可能会造成继承链太长）
  ✗ 如果模板太复杂，理解起来会比较困难

🔧 核心概念：
  1. 父类定义流程骨架（模板方法）
  2. 子类实现具体步骤
  3. 使用钩子方法灵活控制流程

🎬 真实场景：
  • HTTP请求处理流程
  • 文件上传处理流程
  • 各种初始化流程
  • React/Vue组件生命周期
`);
