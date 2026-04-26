/**
 * ==========================================
 * 软件设计模式讲解：迭代器模式 & 组合模式
 * 讲师：一名有爱心的老师 ❤️
 * 学生身份：前端实习生，放心，全用JavaScript！
 * ==========================================
 */

// ==========================================
// 第一部分：迭代器模式 (Iterator Pattern)
// ==========================================

/**
 * 一、先问你一个日常问题：
 * ========================
 * 想象你是个图书馆管理员，有很多书（数组），你要让游客遍历这些书。
 * 但问题是：
 * - 有人想用 for 循环
 * - 有人想用 forEach
 * - 有人想反向遍历
 * - 有人想跳过某些书
 * 
 * 你怎么办？不能为每个需求都写不同的遍历逻辑吧！
 * 
 * 迭代器模式就是解决这个问题的！它提供一种统一的、标准的方式
 * 来访问一个集合中的元素，而不用暴露这个集合的内部结构。
 */

console.log("\n========== 迭代器模式讲解 ==========\n");

// ──────────────────────────────────────────
// 案例1：没有迭代器模式的问题（反面教材）
// ──────────────────────────────────────────

class BookShelf_BadWay {
  constructor() {
    this.books = ['JavaScript高级编程', 'React实战', 'Node.js学习'];
  }
  
  // 问题：为每种遍历方式都要写一个方法，太冗余了！
  getBooks() {
    return this.books;
  }
  
  forwardTraverse() {
    for (let i = 0; i < this.books.length; i++) {
      console.log(this.books[i]);
    }
  }
  
  backwardTraverse() {
    for (let i = this.books.length - 1; i >= 0; i--) {
      console.log(this.books[i]);
    }
  }
  
  everyOtherBook() {
    for (let i = 0; i < this.books.length; i += 2) {
      console.log(this.books[i]);
    }
  }
  // 如果还要跳过第一本、每隔3本取一本... 就要继续加方法，这样就违反了开闭原则
}

console.log("❌ 问题场景：不使用迭代器模式");
const badShelf = new BookShelf_BadWay();
console.log("问题：集合对象暴露了内部实现，遍历逻辑混乱，难以维护\n");

// ──────────────────────────────────────────
// 案例2：使用迭代器模式的优雅解法
// ──────────────────────────────────────────

/**
 * 核心思想：
 * 1. 创建一个迭代器对象，它负责管理遍历的过程
 * 2. 迭代器提供两个关键方法：
 *    - hasNext()：检查是否还有下一个元素
 *    - next()：获取下一个元素
 * 3. 集合对象只需要提供获取迭代器的方法即可
 */

// 第一步：定义一个"标准的迭代器"（就像一个遍历规范）
class Iterator {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }
  
  // 检查是否还有下一个元素
  hasNext() {
    return this.index < this.data.length;
  }
  
  // 获取下一个元素
  next() {
    if (this.hasNext()) {
      return this.data[this.index++];
    }
    return null;
  }
  
  // 重置指针，方便重新遍历
  reset() {
    this.index = 0;
  }
}

// 第二步：定义一个书架类（这是我们的集合）
class BookShelf {
  constructor() {
    this.books = ['JavaScript高级编程', 'React实战', 'Node.js学习'];
  }
  
  // 这是关键！提供获取迭代器的方法
  getIterator() {
    return new Iterator(this.books);
  }
}

console.log("✅ 使用迭代器模式 - 基础版本：");
const shelf = new BookShelf();
const iterator = shelf.getIterator();

// 现在遍历变得统一而优雅了！
console.log("正向遍历所有书籍：");
while (iterator.hasNext()) {
  console.log(`  📚 ${iterator.next()}`);
}

console.log(); // 空行

// ──────────────────────────────────────────
// 案例3：更高级的迭代器 - 支持多种遍历方式
// ──────────────────────────────────────────

class ReverseIterator {
  constructor(data) {
    this.data = data;
    this.index = data.length - 1; // 从末尾开始
  }
  
  hasNext() {
    return this.index >= 0;
  }
  
  next() {
    if (this.hasNext()) {
      return this.data[this.index--];
    }
    return null;
  }
}

class FilterIterator {
  constructor(data, condition) {
    this.data = data;
    this.condition = condition;
    this.index = 0;
  }
  
  hasNext() {
    while (this.index < this.data.length) {
      if (this.condition(this.data[this.index])) {
        return true;
      }
      this.index++;
    }
    return false;
  }
  
  next() {
    if (this.hasNext()) {
      return this.data[this.index++];
    }
    return null;
  }
}

class AdvancedBookShelf {
  constructor() {
    this.books = [
      { name: 'JavaScript高级编程', pages: 800 },
      { name: 'React实战', pages: 500 },
      { name: 'Node.js学习', pages: 400 }
    ];
  }
  
  // 正向迭代器
  getIterator() {
    return new AdvancedIterator(this.books);
  }
  
  // 反向迭代器
  getReverseIterator() {
    return new ReverseIterator(this.books);
  }
  
  // 筛选迭代器 - 只遍历超过600页的书
  getLongBookIterator() {
    return new FilterIterator(
      this.books,
      book => book.pages > 600
    );
  }
}

class AdvancedIterator {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }
  
  hasNext() {
    return this.index < this.data.length;
  }
  
  next() {
    if (this.hasNext()) {
      return this.data[this.index++];
    }
    return null;
  }
}

console.log("✅ 高级迭代器 - 多种遍历策略：");
const advancedShelf = new AdvancedBookShelf();

console.log("1️⃣ 正向遍历：");
const normalIter = advancedShelf.getIterator();
while (normalIter.hasNext()) {
  const book = normalIter.next();
  console.log(`  📚 ${book.name} (${book.pages}页)`);
}

console.log("\n2️⃣ 反向遍历：");
const reverseIter = advancedShelf.getReverseIterator();
while (reverseIter.hasNext()) {
  const book = reverseIter.next();
  console.log(`  📚 ${book.name} (${book.pages}页)`);
}

console.log("\n3️⃣ 筛选遍历（只显示超过600页的书）：");
const longBookIter = advancedShelf.getLongBookIterator();
while (longBookIter.hasNext()) {
  const book = longBookIter.next();
  console.log(`  📚 ${book.name} (${book.pages}页)`);
}

// ──────────────────────────────────────────
// 案例4：JavaScript原生的迭代器（你经常在用！）
// ──────────────────────────────────────────

console.log("\n✅ JavaScript原生迭代器 - 你其实早就在用了：");

/**
 * 你知道吗？JavaScript数组其实就实现了迭代器模式！
 * for...of 循环就是基于迭代器协议的！
 */

const fruits = ['🍎苹果', '🍊橙子', '🍌香蕉'];

// 这是JavaScript的迭代器对象必须有的结构
const iter = fruits[Symbol.iterator]();

console.log("手动调用迭代器：");
console.log(iter.next()); // { value: '🍎苹果', done: false }
console.log(iter.next()); // { value: '🍊橙子', done: false }
console.log(iter.next()); // { value: '🍌香蕉', done: false }
console.log(iter.next()); // { value: undefined, done: true }

console.log("\nfor...of 其实就是在底层调用迭代器：");
for (const fruit of fruits) {
  console.log(`  ${fruit}`);
}

// ──────────────────────────────────────────
// 🎯 迭代器模式总结
// ──────────────────────────────────────────

console.log(`
╔════════════════════════════════════════════╗
║         迭代器模式 - 核心要点              ║
╠════════════════════════════════════════════╣
║ 1. 目的：统一访问集合元素，隐藏内部结构   ║
║ 2. 核心：hasNext() + next() 两个方法      ║
║ 3. 优点：                                  ║
║    ✅ 支持多种遍历方式                    ║
║    ✅ 集合和遍历逻辑解耦                  ║
║    ✅ 可以灵活定制迭代规则                ║
║ 4. 适用场景：                              ║
║    📌 需要多种遍历集合的方式              ║
║    📌 希望隐藏集合的内部结构              ║
║    📌 需要支持不同的遍历策略              ║
╚════════════════════════════════════════════╝
`);




// ==========================================
// 第二部分：组合模式 (Composite Pattern)
// ==========================================

/**
 * 一、又是一个日常问题：
 * ========================
 * 想象你在开发一个文件管理系统：
 * - 有文件（叶子节点）- 比如 document.txt
 * - 有文件夹（分支节点）- 比如 Documents文件夹
 * - 文件夹里还可以套文件夹！（树形结构）
 * 
 * 现在的问题是：
 * - 文件和文件夹需要不同的操作方式吗？
 * - 我想统一地处理"获取大小"，无论是单个文件还是整个文件夹
 * - 我想统一地遍历所有内容，无论嵌套多深
 * 
 * 组合模式就是为了优雅地处理这种"树形"的、"容器与内容相似"的结构！
 */

console.log("\n\n========== 组合模式讲解 ==========\n");

// ──────────────────────────────────────────
// 案例1：没有组合模式的问题（反面教材）
// ──────────────────────────────────────────

class File_BadWay {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
  
  getSize() {
    return this.size;
  }
}

class Folder_BadWay {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  
  add(item) {
    this.children.push(item);
  }
  
  // 问题：必须知道具体是文件还是文件夹，才能操作
  // 这样处理逻辑会很混乱！
  getSize() {
    let totalSize = 0;
    for (let child of this.children) {
      if (child instanceof File_BadWay) {
        totalSize += child.getSize();
      } else if (child instanceof Folder_BadWay) {
        totalSize += child.getSize();
      }
    }
    return totalSize;
  }
}

console.log("❌ 问题场景：不使用组合模式");
console.log("问题：需要区分对待文件和文件夹，代码复杂\n");

// ──────────────────────────────────────────
// 案例2：使用组合模式的优雅解法
// ──────────────────────────────────────────

/**
 * 核心思想：
 * 1. 定义一个统一的接口/基类，给文件和文件夹都实现
 * 2. 文件是"叶子"，直接实现操作
 * 3. 文件夹是"容器"，递归调用子元素的操作
 * 4. 使用者不需要区分是文件还是文件夹，统一处理！
 * 
 * 这样就形成了一个"树形结构"，可以递归处理。
 */

// 第一步：定义一个统一的基类或接口（你可以想成是"规范"）
class FileSystemItem {
  constructor(name) {
    this.name = name;
  }
  
  // 这两个方法，所有的文件系统项都要实现
  getSize() {
    throw new Error('getSize() 必须被实现');
  }
  
  display(indent = 0) {
    throw new Error('display() 必须被实现');
  }
}

// 第二步：文件类 - "叶子节点"
class File extends FileSystemItem {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  
  getSize() {
    return this.size;
  }
  
  display(indent = 0) {
    console.log(' '.repeat(indent) + `📄 ${this.name} (${this.size}KB)`);
  }
}

// 第三步：文件夹类 - "分支节点/容器"
class Folder extends FileSystemItem {
  constructor(name) {
    super(name);
    this.children = []; // 可以包含文件或文件夹
  }
  
  add(item) {
    this.children.push(item);
  }
  
  remove(item) {
    const index = this.children.indexOf(item);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
  
  getSize() {
    // 关键：递归调用子元素的 getSize()
    // 不需要判断是文件还是文件夹，因为都有这个方法！
    let totalSize = 0;
    for (let child of this.children) {
      totalSize += child.getSize();
    }
    return totalSize;
  }
  
  display(indent = 0) {
    console.log(' '.repeat(indent) + `📁 ${this.name}/`);
    for (let child of this.children) {
      child.display(indent + 2); // 缩进显示子元素
    }
  }
}

console.log("✅ 使用组合模式 - 文件管理系统：");

// 构建一个文件树
const root = new Folder('根目录');

const documents = new Folder('Documents');
const pictures = new Folder('Pictures');

const resume = new File('简历.pdf', 200);
const notes = new File('笔记.txt', 50);
const photo1 = new File('旅游.jpg', 1000);
const photo2 = new File('团队.jpg', 800);

// 组织文件结构
documents.add(resume);
documents.add(notes);
pictures.add(photo1);
pictures.add(photo2);

root.add(documents);
root.add(pictures);

// 甚至可以嵌套更深的结构
const work = new Folder('工作');
const projectA = new Folder('ProjectA');
const code = new File('index.js', 50);
projectA.add(code);
work.add(projectA);
root.add(work);

console.log("整个文件系统结构：");
root.display();

console.log(`\n根目录总大小：${root.getSize()}KB`);
console.log(`Documents大小：${documents.getSize()}KB`);
console.log(`Pictures大小：${pictures.getSize()}KB`);
console.log(`工作文件夹大小：${work.getSize()}KB`);

// ──────────────────────────────────────────
// 案例3：遍历所有文件（迭代器 + 组合的结合）
// ──────────────────────────────────────────

console.log("\n✅ 高级用法 - 遍历所有文件并筛选：");

// 定义一个获取所有文件的迭代器
function getAllFiles(folder) {
  const files = [];
  
  function traverse(item) {
    if (item instanceof File) {
      files.push(item);
    } else if (item instanceof Folder) {
      for (let child of item.children) {
        traverse(child);
      }
    }
  }
  
  traverse(folder);
  return files;
}

// 获取所有文件
const allFiles = getAllFiles(root);
console.log(`总共有 ${allFiles.length} 个文件：`);
allFiles.forEach(file => {
  console.log(`  📄 ${file.name}`);
});

// 筛选大文件（>300KB）
console.log("\n只显示大于300KB的文件：");
const largeFiles = allFiles.filter(file => file.size > 300);
largeFiles.forEach(file => {
  console.log(`  📄 ${file.name} (${file.size}KB)`);
});

// ──────────────────────────────────────────
// 案例4：真实场景 - UI组件树（React开发者会很熟悉）
// ──────────────────────────────────────────

console.log("\n✅ 实战场景 - 构建一个UI组件树：");

class UIComponent {
  constructor(name) {
    this.name = name;
  }
  
  render() {
    throw new Error('render() 必须被实现');
  }
  
  getChildrenCount() {
    throw new Error('getChildrenCount() 必须被实现');
  }
}

// 叶子节点：基础UI元素
class Button extends UIComponent {
  render() {
    return `<button>${this.name}</button>`;
  }
  
  getChildrenCount() {
    return 0;
  }
}

class TextInput extends UIComponent {
  render() {
    return `<input type="text" placeholder="${this.name}" />`;
  }
  
  getChildrenCount() {
    return 0;
  }
}

// 容器节点：能包含其他组件
class Panel extends UIComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }
  
  add(component) {
    this.children.push(component);
  }
  
  render() {
    const childrenHTML = this.children.map(child => child.render()).join('\n');
    return `
<div class="${this.name}">
  ${childrenHTML}
</div>`;
  }
  
  getChildrenCount() {
    let count = this.children.length;
    for (let child of this.children) {
      count += child.getChildrenCount();
    }
    return count;
  }
}

// 构建一个简单的表单UI
const form = new Panel('form');
const inputPanel = new Panel('input-group');
const buttonPanel = new Panel('button-group');

inputPanel.add(new TextInput('用户名'));
inputPanel.add(new TextInput('密码'));

buttonPanel.add(new Button('登录'));
buttonPanel.add(new Button('注册'));

form.add(inputPanel);
form.add(buttonPanel);

console.log("渲染出的HTML：");
console.log(form.render());
console.log(`\n这个表单总共有 ${form.getChildrenCount()} 个子组件`);

// ──────────────────────────────────────────
// 🎯 组合模式总结
// ──────────────────────────────────────────

console.log(`
╔════════════════════════════════════════════╗
║         组合模式 - 核心要点                ║
╠════════════════════════════════════════════╣
║ 1. 目的：统一处理树形结构中的对象          ║
║        （让叶子和容器有相同的接口）       ║
║ 2. 结构：                                  ║
║    ├─ 基类/接口：定义统一的操作方法      ║
║    ├─ 叶子类：具体实现（无子元素）       ║
║    └─ 容器类：包含子元素（递归实现）     ║
║ 3. 优点：                                  ║
║    ✅ 统一处理单个对象和对象集合          ║
║    ✅ 自然地表示树形结构                  ║
║    ✅ 递归处理很直观和优雅                ║
║ 4. 适用场景：                              ║
║    📌 文件系统（文件夹和文件）            ║
║    📌 UI组件树（Panel和Button等）        ║
║    📌 菜单系统（多级菜单）                ║
║    📌 任何需要形成树形结构的场景          ║
╚════════════════════════════════════════════╝
`);

// ==========================================
// 总结：迭代器 vs 组合
// ==========================================

console.log(`
╔════════════════════════════════════════════════════════╗
║     迭代器模式 vs 组合模式 - 区别对比                  ║
╠════════════════════════════════════════════════════════╣
║                  迭代器模式                            ║
║  问题：如何遍历集合中的元素？                          ║
║  解法：提供统一的遍历接口（hasNext、next）            ║
║  结构：线性的、一维的                                  ║
║  关键词：顺序访问、不暴露内部结构                      ║
║                                                        ║
║                  组合模式                              ║
║  问题：如何处理树形结构？                              ║
║  解法：让叶子和容器有相同接口，递归处理                ║
║  结构：树形的、多维的、可嵌套的                        ║
║  关键词：树结构、递归、统一接口                        ║
╚════════════════════════════════════════════════════════╝
`);

console.log("🎓 学到这里，你已经掌握了两个非常实用的设计模式！");
console.log("💡 提示：在实际工作中，这两个模式经常一起出现和使用。");
