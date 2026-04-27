// 一个电子商务系统，当一个新的消费用户加入系统，希望做以下两个操作：
// 向消费者发送一封欢迎邮件
// 向邮局查证消费者地址

//主题
class System {
  constructor() {
    this.observers = [];
  }

  //订阅
  register(o) {
    this.observers.push(o);
  }

  //取消订阅
  remove(o) {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  //遍历通知
  notify() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }

  //更新
  set() {
    this.notify();
  }
}

class PostWelcomeEmail {
  update() {
    console.log("发送邮件");
  }
}

class AcknowledgeAddress {
  update() {
    console.log("确认地址");
  }
}

const businessSystem = new System();
const postWelcomeEmail = new PostWelcomeEmail();
const acknowledgeAddress = new AcknowledgeAddress();

businessSystem.register(postWelcomeEmail);
businessSystem.register(acknowledgeAddress);

businessSystem.set();
