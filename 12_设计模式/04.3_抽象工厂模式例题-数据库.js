// 某系统为了改进数据库操作的性能， 自定义数据库连接对象Connection和语句对象Statement，
// 可针对不同类型的数据库提供不同的连接对象和语句对象，
// 如提供Oracle或MySQL专用连接类和语句类，
// 而且用户可以通过配置文件等方式根据实际需要动态的选择系统数据库，使用抽象工厂模式设计该系统。

// ============ 产品类 ============
// Connection 抽象类
class Connection {
  connect() {
    throw new Error("connect() must be implemented");
  }
}

// Statement 抽象类
class Statement {
  execute() {
    throw new Error("execute() must be implemented");
  }
}

// Oracle 具体连接类
class OracleConnection extends Connection {
  connect() {
    console.log("Oracle 数据库连接成功");
    return "Oracle连接对象";
  }
}

// Oracle 具体语句类
class OracleStatement extends Statement {
  execute(sql) {
    console.log(`Oracle 执行SQL: ${sql}`);
    return "Oracle查询结果";
  }
}

// MySQL 具体连接类
class MySQLConnection extends Connection {
  connect() {
    console.log("MySQL 数据库连接成功");
    return "MySQL连接对象";
  }
}

// MySQL 具体语句类
class MySQLStatement extends Statement {
  execute(sql) {
    console.log(`MySQL 执行SQL: ${sql}`);
    return "MySQL查询结果";
  }
}

// ============ 工厂类 ============
// 抽象工厂
class AbstractFactory {
  createConnection() {
    throw new Error("createConnection() must be implemented");
  }

  createStatement() {
    throw new Error("createStatement() must be implemented");
  }
}

// Oracle 具体工厂
class OracleFactory extends AbstractFactory {
  createConnection() {
    return new OracleConnection();
  }

  createStatement() {
    return new OracleStatement();
  }
}

// MySQL 具体工厂
class MySQLFactory extends AbstractFactory {
  createConnection() {
    return new MySQLConnection();
  }

  createStatement() {
    return new MySQLStatement();
  }
}

// ============ 使用示例 ============
// 可通过配置文件动态选择数据库
const config = { dbType: "mysql" }; // 或 'oracle'

function createFactory(dbType) {
  if (dbType === "oracle") {
    return new OracleFactory();
  } else if (dbType === "mysql") {
    return new MySQLFactory();
  }
  throw new Error("不支持的数据库类型");
}

// 客户端代码
const factory = createFactory(config.dbType);
const connection = factory.createConnection();
const statement = factory.createStatement();

connection.connect();
statement.execute("SELECT * FROM users");
