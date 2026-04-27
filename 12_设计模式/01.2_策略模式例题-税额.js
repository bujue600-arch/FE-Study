// 一个电子商务系统，其中有一个控制器对象（TaskController），
// 用于处理销售请求，能够确认何时有人在请求销售订单，并将请求转给SalesOrder对象处理。
// SalesOrder对象的功能包括：
// 填写订单
// 计算税额（基于不同税率）
// 用不同尺寸纸张打印收据

// ===== 税率策略 =====
class TaxStrategies {
  // 基类，定义税率计算接口
  calculate(price) {
    throw new Error("子类必须实现 calculate 方法");
  }
}

// 增值税策略（13%）
class VATTax extends TaxStrategies {
  calculate(price) {
    return price * 0.13;
  }
}

// 营销税策略（10%）
class SalesTax extends TaxStrategies {
  calculate(price) {
    return price * 0.1;
  }
}

// 进口税策略（5%）
class ImportTax extends TaxStrategies {
  calculate(price) {
    return price * 0.05;
  }
}

// ===== 打印纸张策略 =====
class PrintStrategy {
  // 基类，定义打印接口
  print(content) {
    throw new Error("子类必须实现 print 方法");
  }
}

// A4纸张打印
class A4Paper extends PrintStrategy {
  print(content) {
    console.log("=== A4纸张打印 ===");
    console.log(content);
    console.log("==================\n");
  }
}

// A5纸张打印（小纸张）
class A5Paper extends PrintStrategy {
  print(content) {
    console.log("--- A5纸张打印 ---");
    console.log(content);
    console.log("-------------------\n");
  }
}

// ===== 销售订单类 =====
class SalesOrder {
  constructor(productName, price) {
    this.productName = productName;
    this.price = price;
    this.quantity = 0;
    this.taxStrategy = null;
    this.printStrategy = null;
  }

  // 填写订单
  fillOrder(quantity) {
    this.quantity = quantity;
    console.log(`✓ 订单已填写: ${this.productName} × ${quantity}`);
  }

  // 设置税率策略
  setTaxStrategy(strategy) {
    if (!(strategy instanceof TaxStrategies)) {
      throw new Error("税率策略必须继承自TaxStrategies");
    }
    this.taxStrategy = strategy;
  }

  // 设置打印策略
  setPrintStrategy(strategy) {
    if (!(strategy instanceof PrintStrategy)) {
      throw new Error("打印策略必须继承自PrintStrategy");
    }
    this.printStrategy = strategy;
  }

  // 计算税额
  calculateTax() {
    if (!this.taxStrategy) {
      throw new Error("未设置税率策略，无法计算税额");
    }
    const totalPrice = this.price * this.quantity;
    const tax = this.taxStrategy.calculate(totalPrice);
    console.log(`✓ 税额计算: ￥${totalPrice} × 税率 = ￥${tax.toFixed(2)}`);
    return tax;
  }

  // 打印收据
  printReceipt() {
    if (!this.printStrategy) {
      throw new Error("未设置打印策略，无法打印收据");
    }
    const totalPrice = this.price * this.quantity;
    const tax = this.taxStrategy.calculate(totalPrice);
    const receipt = `
商品: ${this.productName}
数量: ${this.quantity}
单价: ￥${this.price}
小计: ￥${totalPrice}
税额: ￥${tax.toFixed(2)}
合计: ￥${(totalPrice + tax).toFixed(2)}
    `.trim();
    this.printStrategy.print(receipt);
  }
}

// ===== 任务控制器 =====
class TaskController {
  processOrder(order) {
    console.log("\n--- 开始处理订单 ---");
    // 订单流程：填写 → 计算税 → 打印
    order.fillOrder(order.quantity);
    order.calculateTax();
    order.printReceipt();
  }
}

// ===== 使用演示 =====
console.log("========== 策略模式示例 ==========\n");

// 订单1: 国内商品，用A4纸打印
const order1 = new SalesOrder("苹果", 10);
order1.quantity = 5;
order1.setTaxStrategy(new VATTax()); // 使用增值税策略
order1.setPrintStrategy(new A4Paper()); // 使用A4纸张

// 订单2: 进口商品，用A5纸打印
const order2 = new SalesOrder("香蕉", 15);
order2.quantity = 3;
order2.setTaxStrategy(new ImportTax()); // 使用进口税策略
order2.setPrintStrategy(new A5Paper()); // 使用A5纸张

const controller = new TaskController();
controller.processOrder(order1);
controller.processOrder(order2);
