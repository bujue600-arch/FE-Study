// 某系统日志记录器要求支持多种日志记录方式，
// 如文件日志记录（FileLog）、数据库日志记录（DatabaseLog）等、
// 且用户可根据要求动态选择日志记录方式，设计系统。

class LogFactory {
  create() {
    throw new Error("必须实现create方法");
  }
}

class FileLog {}

class FileLogFactory extends LogFactory {
  create() {
    return new FileLog();
  }
}

class DatabaseLog {}

class DatabaseLogFactory extends LogFactory {
  create() {
    return new DatabaseLog();
  }
}
