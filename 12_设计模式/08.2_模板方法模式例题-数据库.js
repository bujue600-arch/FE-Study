// 对数据库的操作一般包括连接、打开、使用、关闭等步骤，
// 在数据库操作模板类中我们定义了connDB（）,openDB（）,useDB()，closeDB（）四个方法分别对应这四个步骤，
// 对于不同类型的数据库 （如SQLserver和Oracle）， 其操作步骤都一致， 只是连接数据库connDB（）方法有所区别，现使用模板方法模式对其进行设计。

class Template {
  constructor() {}

  // 模板方法：定义数据库操作的整个流程
  operation() {
    this.connDB();
    this.openDB();
    this.useDB();
    this.closeDB();
  }

  connDB() {
    throw new Error("子类必须实现连接数据库方法");
  }
  openDB() {
    console.log("打开数据库");
  }
  useDB() {
    console.log("使用数据库");
  }
  closeDB() {
    console.log("关闭数据库");
  }
}

class SQLserver extends Template {
  connDB() {
    console.log("连接SQLserver");
  }
}

class Oracleserver extends Template {
  connDB() {
    console.log("连接Oracleserver");
  }
}

// 使用示例
console.log("=== SQL Server 操作流程 ===");
const sqlserver = new SQLserver();
sqlserver.operation();

console.log("\n=== Oracle Server 操作流程 ===");
const oracle = new Oracleserver();
oracle.operation();
