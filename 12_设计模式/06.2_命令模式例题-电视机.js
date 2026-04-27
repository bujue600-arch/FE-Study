// 电视机是请求的接收者， 遥控器是请求的发送者
// 遥控器上有一些按钮， 不同的按钮对应电视机的不同操作。
// 抽象命令角色由一个命令接口来扮演， 有三个具体的命令类实现了抽象命令接口，
// 这三个具体命令类分别代表三种操作：打开电视机、 关闭电视机和切换台。

//接收者
class TV {
  constructor() {
    this.isOpen = false;
    this.channel = 0;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  switch(num) {
    this.channel = num;
  }
}

//具体命令
class OpenCommand {
  constructor(tv) {
    this.tv = tv;
  }

  execute() {
    this.tv.open();
  }
}

class CloseCommand {
  constructor(tv) {
    this.tv = tv;
  }

  execute() {
    this.tv.close();
  }
}

class SwitchCommand {
  constructor(tv) {
    this.tv = tv;
  }

  execute(num) {
    this.tv.switch(num);
  }
}

//发送者
class controller {
  constructor() {
    this.currentCommand = null;
  }

  setCommand(command) {
    this.currentCommand = command;
  }

  pressOn() {
    this.currentCommand.execute();
  }
}
