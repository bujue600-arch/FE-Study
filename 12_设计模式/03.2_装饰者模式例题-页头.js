// 有一个程序打印发票，所有发票都需要有正文部分，同时根据用户需要有的订单需要有表头，
// 有的需要有页脚。 表头有三种，分别为“表头1”，“表头2”，“表头3”，
// 页脚有两种， 分别为“页脚1”， “页脚2”。
// 不同用户可能要求零个或多个表头，零个或多个页脚

class Receipt {
  constructor() {
    this.text = "正文";
  }

  print() {
    console.log(this.text);
  }
}

class Decorator {
  constructor(receipt) {
    this.receipt = receipt;
  }

  print() {
    console.log("必须实现print方法");
  }
}

class Header1 extends Decorator {
  print() {
    console.log("表头1");
    this.receipt.print();
  }
}

class Header2 extends Decorator {
  print() {
    console.log("表头2");
    this.receipt.print();
  }
}

class Header3 extends Decorator {
  print() {
    console.log("表头3");
    this.receipt.print();
  }
}

class Footer1 extends Decorator {
  print() {
    this.receipt.print();
    console.log("页脚1");
  }
}

class Footer2 extends Decorator {
  print() {
    this.receipt.print();
    console.log("页脚2");
  }
}

// 测试用例
console.log("=== 基础发票 ===");
const receipt = new Receipt();
receipt.print();

console.log("\n=== 只有表头1 ===");
const receipt1 = new Header1(receipt);
receipt1.print();

console.log("\n=== 表头1 + 页脚1 ===");
const receipt2 = new Header1(receipt);
const receipt3 = new Footer1(receipt2);
receipt3.print();

console.log("\n=== 表头1 + 表头2 + 页脚1 + 页脚2 ===");
const receipt4 = new Header1(receipt);
const receipt5 = new Header2(receipt4);
const receipt6 = new Footer1(receipt5);
const receipt7 = new Footer2(receipt6);
receipt7.print();
