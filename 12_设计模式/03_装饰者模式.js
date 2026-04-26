/* ============================================
   装饰者模式（Decorator Pattern）- 完整讲解
   ============================================
   
   大家好！今天我们来学习一个非常实用的设计模式：装饰者模式。
   这个模式在前端开发中用得特别频繁，学好了会让你的代码更灵活。
*/

// ================== 第一部分：问题引入 ==================

// 【场景一】想象你有一个普通的"士兵"类
class Soldier {
  attack() {
    console.log('士兵用剑攻击，造成 10 点伤害');
  }
}

// 现在你想给士兵增加不同的装备：
// - 加盔甲：增加防御
// - 加魔法：增加魔法伤害
// - 既要盔甲又要魔法

// ❌ 糟糕的做法1：改动原类（不符合开闭原则）
// 如果每次都修改原类，那原类会越来越复杂...

class SoldierWithArmor extends Soldier {
  attack() {
    super.attack();
    console.log('盔甲额外增加 5 点防御');
  }
}

class SoldierWithMagic extends Soldier {
  attack() {
    super.attack();
    console.log('魔法增加 8 点伤害');
  }
}

// ❌ 糟糕的做法2：排列组合（会产生爆炸式的类）
class SoldierWithArmorAndMagic extends Soldier {
  attack() {
    super.attack();
    console.log('盔甲防御 + 魔法伤害');
  }
}
// 如果再加一个特性，又要创建新类... 这样会导致类爆炸！

console.log('=== 问题演示 ===');
const soldier1 = new Soldier();
soldier1.attack();

console.log('\n--- 子类继承方案的问题 ---');
const soldierWithArmor = new SoldierWithArmor();
soldierWithArmor.attack();

console.log('\n--- 可以看到，这样做会导致类越来越多 ---\n');

// ================== 第二部分：装饰者模式的精妙解决方案 ==================

console.log('=== 装饰者模式解决方案 ===\n');

// 步骤1：创建基础类（最简单的形式）
class BasicSoldier {
  attack() {
    return '基础士兵：用剑攻击，造成 10 点伤害';
  }

  getStats() {
    return {
      defense: 0,
      damage: 10,
      description: '普通士兵'
    };
  }
}

// 步骤2：创建装饰者基类
// 重要！装饰者必须和被装饰的对象有相同的接口
class SoldierDecorator {
  constructor(soldier) {
    this.soldier = soldier;
  }

  // 关键点：装饰者必须实现与原对象相同的方法
  attack() {
    return this.soldier.attack();
  }

  getStats() {
    return this.soldier.getStats();
  }
}

// 步骤3：创建具体装饰者 - 盔甲装饰
class ArmorDecorator extends SoldierDecorator {
  attack() {
    // 先调用被装饰对象的方法
    const baseAttack = this.soldier.attack();
    // 再加上自己的功能
    return baseAttack + '\n盔甲装饰：增加 5 点防御';
  }

  getStats() {
    const stats = this.soldier.getStats();
    return {
      ...stats,
      defense: stats.defense + 5,
      description: stats.description + ' + 盔甲'
    };
  }
}

// 步骤4：创建具体装饰者 - 魔法装饰
class MagicDecorator extends SoldierDecorator {
  attack() {
    const baseAttack = this.soldier.attack();
    return baseAttack + '\n魔法装饰：增加 8 点伤害';
  }

  getStats() {
    const stats = this.soldier.getStats();
    return {
      ...stats,
      damage: stats.damage + 8,
      description: stats.description + ' + 魔法'
    };
  }
}

// 步骤5：创建具体装饰者 - 强化药水装饰
class PotionDecorator extends SoldierDecorator {
  attack() {
    const baseAttack = this.soldier.attack();
    return baseAttack + '\n药水装饰：攻击力翻倍！伤害翻倍！';
  }

  getStats() {
    const stats = this.soldier.getStats();
    return {
      ...stats,
      damage: stats.damage * 2,
      description: stats.description + ' + 强化药水'
    };
  }
}

// ================== 第三部分：使用演示 ==================

console.log('【演示1】基础士兵');
let soldier = new BasicSoldier();
console.log(soldier.attack());
console.log('属性:', soldier.getStats());

console.log('\n【演示2】加上盔甲');
soldier = new ArmorDecorator(soldier);
console.log(soldier.attack());
console.log('属性:', soldier.getStats());

console.log('\n【演示3】再加上魔法');
soldier = new MagicDecorator(soldier);
console.log(soldier.attack());
console.log('属性:', soldier.getStats());

console.log('\n【演示4】再加上强化药水');
soldier = new PotionDecorator(soldier);
console.log(soldier.attack());
console.log('属性:', soldier.getStats());

console.log('\n【演示5】不同的组合方案');
// 方案A：只要盔甲和魔法
let soldierA = new MagicDecorator(new ArmorDecorator(new BasicSoldier()));
console.log('方案A（盔甲+魔法）:', soldierA.getStats());

// 方案B：盔甲+药水
let soldierB = new PotionDecorator(new ArmorDecorator(new BasicSoldier()));
console.log('方案B（盔甲+药水）:', soldierB.getStats());

// 方案C：魔法+药水
let soldierC = new PotionDecorator(new MagicDecorator(new BasicSoldier()));
console.log('方案C（魔法+药水）:', soldierC.getStats());

// ================== 第四部分：核心要点总结 ==================

console.log('\n\n=== 装饰者模式的核心要点 ===\n');

console.log(`
✨ 核心思想：
  装饰者模式就像给礼物包装一样。你有一个礼物（被装饰对象），
  然后用包装纸装饰它，再加上蝴蝶结，最后套个盒子。
  每一层装饰都给礼物增加了新的外观（功能），但礼物本身没变。

📝 关键特征：
  1. 装饰者和被装饰对象有相同的接口（在JS中就是相同的方法）
  2. 装饰者持有被装饰对象的引用
  3. 装饰者添加新的行为，而不是修改原对象
  4. 可以无限嵌套装饰

✅ 优势：
  1. 遵循开闭原则（对扩展开放，对修改关闭）
  2. 避免了类爆炸（不用为每个组合创建新类）
  3. 职责单一（每个装饰者只负责一个功能）
  4. 灵活组合（可以动态组合各种功能）

⚠️ 缺点：
  1. 会增加对象的数量（多层嵌套时）
  2. 调试可能会比较复杂（需要理解装饰链）
  3. 装饰的顺序有时会影响结果
`);

// ================== 第五部分：实战应用场景 ==================

console.log('=== 前端常见应用场景 ===\n');

// 场景1：函数装饰（最常见）
console.log('【场景1】函数装饰');

function sayHello(name) {
  return `Hello, ${name}!`;
}

// 装饰函数：添加日志功能
function withLogging(fn) {
  return function(...args) {
    console.log(`📝 调用函数，参数: ${JSON.stringify(args)}`);
    const result = fn(...args);
    console.log(`✅ 函数返回: ${result}`);
    return result;
  };
}

// 装饰函数：添加计时功能
function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`⏱️  耗时: ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

// 使用装饰者
const decoratedSayHello = withTiming(withLogging(sayHello));
decoratedSayHello('小明');

// 场景2：HTTP请求装饰
console.log('\n【场景2】HTTP请求装饰');

class HttpRequest {
  get(url) {
    console.log(`发送GET请求到: ${url}`);
    return `数据来自${url}`;
  }
}

// 装饰器：添加缓存
class CacheDecorator {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
    this.cache = {};
  }

  get(url) {
    if (this.cache[url]) {
      console.log(`✓ 命中缓存: ${url}`);
      return this.cache[url];
    }
    const data = this.httpRequest.get(url);
    this.cache[url] = data;
    return data;
  }
}

// 装饰器：添加重试机制
class RetryDecorator {
  constructor(httpRequest, retries = 2) {
    this.httpRequest = httpRequest;
    this.retries = retries;
  }

  get(url) {
    let lastError;
    for (let i = 0; i <= this.retries; i++) {
      try {
        return this.httpRequest.get(url);
      } catch (error) {
        lastError = error;
        if (i < this.retries) {
          console.log(`⚠️  第 ${i + 1} 次失败，准备重试...`);
        }
      }
    }
    throw lastError;
  }
}

// 使用组合：http => 缓存 => 重试
let http = new HttpRequest();
http = new CacheDecorator(http);
http = new RetryDecorator(http, 2);

console.log(http.get('/api/users'));
console.log(http.get('/api/users')); // 第二次会命中缓存

// ================== 第六部分：思考题 ==================

console.log('\n\n=== 思考题 ===\n');

console.log(`
1. 装饰者和继承有什么区别？
   → 继承是"是一种"关系，装饰者是"拥有一个"关系
   → 继承在编译时确定，装饰者在运行时动态组合

2. 装饰者和代理模式有什么区别？
   → 装饰者是增强功能，代理是控制访问
   → 装饰者通常会改变对象的行为，代理隐藏实现细节

3. 什么时候用装饰者？什么时候用继承？
   → 功能稳定且固定用继承
   → 功能需要动态组合用装饰者
   → 使用装饰者可以避免深层次的继承层级
`);

// ================== 拓展：实际项目中的装饰者模式 ==================

console.log('\n=== 实际应用：React中的HOC（高阶组件）===\n');

console.log(`
在React中，高阶组件(HOC)就是装饰者模式的应用：

// 被装饰的基础组件
function MyComponent(props) {
  return <div>Hello {props.name}</div>;
}

// 装饰者：添加主题功能
function withTheme(Component) {
  return (props) => {
    const theme = { color: 'blue' };
    return <Component {...props} theme={theme} />;
  };
}

// 装饰者：添加认证功能
function withAuth(Component) {
  return (props) => {
    const isAuth = true;
    return isAuth ? <Component {...props} /> : <div>Please login</div>;
  };
}

// 使用：组合多个装饰者
export default withAuth(withTheme(MyComponent));

这样，一个简单的组件可以被多个装饰者增强，
每个装饰者负责一个功能，代码清晰易维护！
`);

console.log('\n🎉 装饰者模式讲解完毕！\n');
