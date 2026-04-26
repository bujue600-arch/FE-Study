/**
 * ==================== 策略模式讲解 ====================
 *
 * 讲师的建议：我们用一个真实场景来理解策略模式
 * 场景：你们公司的电商平台要做促销活动
 */

console.log("========== 第一阶段：没有使用策略模式（烂代码） ==========\n");

/**
 * 问题代码：假如我们写了一个结账函数
 * 这个函数需要根据不同的促销类型计算最终价格
 * 有：满减、折扣、积分兑换等多种优惠
 */

function calculatePrice_Bad(price, promotionType) {
  // 各种if-else... 这样写有什么问题吗？
  if (promotionType === "discount") {
    // 8折优惠
    return price * 0.8;
  } else if (promotionType === "minus") {
    // 满100减20
    if (price >= 100) {
      return price - 20;
    }
    return price;
  } else if (promotionType === "points") {
    // 10%积分兑换
    return price * 0.9;
  } else if (promotionType === "vip") {
    // VIP客户额外8折
    return price * 0.8 * 0.9;
  }
  return price;
}

// 测试
console.log("原价200元：");
console.log("- 打折后：", calculatePrice_Bad(200, "discount")); // 160
console.log("- 满减后：", calculatePrice_Bad(200, "minus")); // 180
console.log("- 积分后：", calculatePrice_Bad(200, "points")); // 180
console.log("- VIP后：", calculatePrice_Bad(200, "vip")); // 144

/**
 * 这样写有什么问题？讲师来分析一下：
 *
 * 1. 代码耦合度高：所有优惠逻辑都混在一个函数里
 * 2. 难以维护：每添加新的优惠类型，就要改这个函数（违反开闭原则）
 * 3. 单一职责违反：这个函数做太多事了
 * 4. 测试困难：每种优惠类型的逻辑混在一起，难以单独测试
 *
 * 想象一下，产品经理给你说：
 * "我们要新增'首购8.5折'、'节日满减'..."
 * 你每次都要修改这个函数，很容易改出bug！
 */

console.log("\n========== 第二阶段：使用策略模式（好代码） ==========\n");

/**
 * 核心思想：
 * 把每种优惠方案都单独成一个"策略"
 * 再用一个"上下文"来选择和使用这些策略
 *
 * 简单来说：
 * - 策略（Strategy）= 一个个具体的优惠算法
 * - 上下文（Context）= 选择和执行策略的管理者
 */

// ============ 第一步：定义各种优惠策略 ============

// 策略1：打折优惠
const discountStrategy = {
  name: "8折优惠",
  calculate(price) {
    return price * 0.8;
  },
};

// 策略2：满减优惠
const minusStrategy = {
  name: "满100减20",
  calculate(price) {
    if (price >= 100) {
      return price - 20;
    }
    return price;
  },
};

// 策略3：积分兑换
const pointsStrategy = {
  name: "10%积分兑换",
  calculate(price) {
    return price * 0.9;
  },
};

// 策略4：VIP优惠（可以组合使用）
const vipStrategy = {
  name: "VIP用户",
  calculate(price) {
    return price * 0.8 * 0.9; // 先打8折，再额外9折
  },
};

// ============ 第二步：创建上下文（Strategy Manager） ============

/**
 * 这个对象是关键！它管理所有的策略
 * 职责：
 * 1. 注册策略
 * 2. 选择合适的策略
 * 3. 执行策略
 */
class PriceCalculator {
  constructor() {
    // 用Map来存储所有策略，这样很方便查找
    this.strategies = new Map();
  }

  // 注册策略
  registerStrategy(name, strategy) {
    this.strategies.set(name, strategy);
    console.log(`✅ 已注册策略: ${strategy.name}`);
  }

  // 计算价格（使用指定的策略）
  calculate(price, strategyName) {
    if (!this.strategies.has(strategyName)) {
      console.warn(`⚠️  策略 "${strategyName}" 不存在，使用原价`);
      return price;
    }

    const strategy = this.strategies.get(strategyName);
    const result = strategy.calculate(price);

    console.log(`💰 使用"${strategy.name}"，$${price} → $${result}`);
    return result;
  }

  // 列出所有可用的策略
  listStrategies() {
    console.log("📋 当前可用的优惠策略：");
    this.strategies.forEach((strategy, name) => {
      console.log(`  - ${name}: ${strategy.name}`);
    });
  }
}

// ============ 第三步：使用策略模式 ============

// 创建计算器实例
const calculator = new PriceCalculator();

// 注册所有策略
calculator.registerStrategy("discount", discountStrategy);
calculator.registerStrategy("minus", minusStrategy);
calculator.registerStrategy("points", pointsStrategy);
calculator.registerStrategy("vip", vipStrategy);

console.log("\n列出所有策略：");
calculator.listStrategies();

// 测试计算
console.log("\n原价200元的各种优惠方案：");
calculator.calculate(200, "discount");
calculator.calculate(200, "minus");
calculator.calculate(200, "points");
calculator.calculate(200, "vip");

/**
 * 现在的好处是什么？讲师来告诉你：
 *
 * 1. 每种优惠是独立的对象，职责清晰
 * 2. 要添加新优惠？只需新增一个策略对象，不需要改主逻辑！
 * 3. 每个策略都可以独立测试
 * 4. 策略可以被重用、组合、扩展
 * 5. 代码易读、易维护、易扩展
 */

console.log("\n========== 第三阶段：进阶用法 ==========\n");

/**
 * 现在产品经理说：添加新的优惠方案
 * "首购用户8.5折" 和 "黑五满500元额外3折"
 *
 * 用传统方法？改主函数，添加if-else...
 * 用策略模式？直接添加新策略！
 */

// 新策略：首购优惠
const firstBuyStrategy = {
  name: "首购用户8.5折",
  calculate(price) {
    return price * 0.85;
  },
};

// 新策略：黑五活动
const blackFridayStrategy = {
  name: "黑五特惠（500+额外3折）",
  calculate(price) {
    if (price >= 500) {
      return price * 0.7; // 原价的70%，相当于3折
    }
    return price;
  },
};

// 注册新策略 - 看，就这么简单！
console.log("添加新的优惠策略：");
calculator.registerStrategy("firstBuy", firstBuyStrategy);
calculator.registerStrategy("blackFriday", blackFridayStrategy);

console.log("\n新策略测试：");
calculator.calculate(150, "firstBuy");
calculator.calculate(600, "blackFriday");

console.log("\n========== 第四阶段：真实场景应用 ==========\n");

/**
 * 场景：订单系统中，不同等级的用户有不同的优惠
 * 一个订单可能要根据用户信息来选择策略
 */

class Order {
  constructor(price, userLevel) {
    this.price = price;
    this.userLevel = userLevel;
    this.calculator = calculator;
  }

  checkout() {
    // 根据用户等级选择不同的策略
    let strategy;

    if (this.userLevel === "vip") {
      strategy = "vip";
    } else if (this.userLevel === "new") {
      strategy = "firstBuy";
    } else if (this.userLevel === "normal") {
      strategy = "discount";
    } else {
      strategy = null; // 无优惠
    }

    if (strategy) {
      const finalPrice = this.calculator.calculate(this.price, strategy);
      console.log(
        `📦 订单完成：${this.userLevel}用户，最终支付: ¥${finalPrice}`,
      );
      return finalPrice;
    } else {
      console.log(`📦 订单完成：普通用户，支付原价: ¥${this.price}`);
      return this.price;
    }
  }
}

// 测试不同用户的订单
console.log("模拟不同用户的订单：");
const order1 = new Order(300, "vip");
order1.checkout();

const order2 = new Order(200, "new");
order2.checkout();

const order3 = new Order(150, "normal");
order3.checkout();

const order4 = new Order(50, "guest");
order4.checkout();

console.log("\n========== 总结 ==========\n");

console.log(`
🎯 策略模式的核心要点：

1. 定义一系列算法，把每一个算法封装起来
   ├─ 每个策略就是一个对象
   ├─ 对象内部有calculate()方法实现具体算法
   └─ 策略之间互相独立

2. 让这些算法可以相互替换
   ├─ 通过统一的接口（这里是calculate方法）
   └─ 客户端不需要关心具体是哪个策略

3. 使得算法的变化不会影响使用算法的客户端
   ├─ 新增策略时只需添加新对象
   ├─ 不需要修改计算器或订单类
   └─ 符合开闭原则（对扩展开放，对修改关闭）

📊 优缺点分析：

优点：
  ✅ 避免多个if-else条件判断
  ✅ 策略可独立测试和复用
  ✅ 代码易扩展，新增策略无需改主逻辑
  ✅ 符合开闭原则和单一职责原则

缺点：
  ❌ 策略多了会产生很多小对象
  ❌ 如果策略很少，可能过度设计

💡 适用场景：
  • 多个对象根据条件选择不同的算法（如你的优惠方案）
  • 需要在运行时切换算法
  • 一个类中有多个if-else分支
  • 想要简化测试（策略对象易于测试）

🔥 前端常见应用场景：
  • 不同支付方式的支付处理（支付宝、微信、银行卡）
  • 不同排序方式（按时间、按热度、按评分）
  • 不同的缓存策略（LRU、LFU、FIFO）
  • 不同的表单验证规则
  • 不同的动画效果选择
`);
