/**
 * ============================================================================
 *                          🎬 命令模式详细讲解
 * ============================================================================
 * 
 * 📖 核心思想：
 * 命令模式是一种行为型设计模式，它的核心思想是：
 * 将"请求"或"操作"封装成一个对象，这样就可以：
 *   ✅ 对请求进行参数化（传递、存储）
 *   ✅ 对请求进行排队或日志记录
 *   ✅ 支持可撤销的操作
 *   ✅ 支持延迟执行
 * 
 * 💡 简单理解：
 * 命令模式 = 把"做什么"从"谁来做"中分离出来
 * 让一个对象来代表一个操作，这样就可以灵活地处理这个操作
 * 
 * ============================================================================
 */

console.log('\n' + '='.repeat(80));
console.log('【第一部分】问题引入：没有设计模式时的痛点');
console.log('='.repeat(80));

/**
 * 😵 场景1：直接调用方法的问题
 * 
 * 假设你在做一个文本编辑器，有这些操作：
 * - 新建文档
 * - 打开文件
 * - 保存文件
 */

class TextEditor {
  constructor() {
    this.content = '';
  }

  newFile() {
    this.content = '';
    console.log('✏️ 新建了一个文件');
  }

  openFile(fileName) {
    this.content = `读取了 ${fileName} 的内容`;
    console.log(`✏️ 打开了文件：${fileName}`);
  }

  saveFile() {
    console.log(`✏️ 保存文件，内容：${this.content}`);
  }
}

console.log('\n【问题示例】');
const editor = new TextEditor();
editor.newFile();
editor.openFile('document.txt');
editor.saveFile();

console.log('\n❌ 问题分析：');
console.log('   1. 操作和执行者耦合太紧密（直接调用方法）');
console.log('   2. 无法记录操作历史');
console.log('   3. 无法实现撤销/重做');
console.log('   4. 无法对操作进行排队或延迟执行');
console.log('   5. 无法把操作保存到日志里');

// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('【第二部分】命令模式的基本实现');
console.log('='.repeat(80));

console.log('\n💡 核心思路：');
console.log('   1. 创建"命令对象"来封装操作');
console.log('   2. 命令对象包含：执行者、操作、参数');
console.log('   3. 分离请求者和执行者的关系');

/**
 * ✅ 第一步：创建具体的命令对象
 */
console.log('\n【步骤1】创建命令类 - 封装一个具体的操作');

// 新建文件命令
class NewFileCommand {
  constructor(editor) {
    this.editor = editor;
  }

  // 执行命令
  execute() {
    this.editor.content = '';
    console.log('  ✏️ [命令执行] 新建了一个文件');
  }

  // 撤销命令
  undo() {
    console.log('  ↩️  [命令撤销] 新建操作已撤销');
  }
}

// 打开文件命令
class OpenFileCommand {
  constructor(editor, fileName) {
    this.editor = editor;
    this.fileName = fileName;
    this.previousContent = '';
  }

  execute() {
    this.previousContent = this.editor.content;
    this.editor.content = `读取了 ${this.fileName} 的内容`;
    console.log(`  ✏️ [命令执行] 打开了文件：${this.fileName}`);
  }

  undo() {
    this.editor.content = this.previousContent;
    console.log(`  ↩️  [命令撤销] 打开文件操作已撤销`);
  }
}

// 保存文件命令
class SaveFileCommand {
  constructor(editor) {
    this.editor = editor;
  }

  execute() {
    console.log(`  ✏️ [命令执行] 保存文件，内容：${this.editor.content}`);
  }

  undo() {
    console.log('  ↩️  [命令撤销] 保存操作无法撤销（这是正确的业务逻辑）');
  }
}

console.log('✅ 定义了三个命令类：NewFileCommand、OpenFileCommand、SaveFileCommand');

/**
 * ✅ 第二步：创建改进的编辑器类（接收命令，不直接执行操作）
 */
console.log('\n【步骤2】改进编辑器 - 接收命令而不是直接操作');

class ImprovedTextEditor {
  constructor() {
    this.content = '';
  }

  // 编辑器只做一件事：执行传进来的命令
  execute(command) {
    command.execute();
  }

  // 还可以提供一个撤销接口
  undo(command) {
    command.undo();
  }
}

console.log('✅ 编辑器现在只需要知道：执行命令对象就行了');

/**
 * ✅ 第三步：使用新的设计
 */
console.log('\n【步骤3】使用改进的设计：');

const improvedEditor = new ImprovedTextEditor();

// 创建命令对象
const newCmd = new NewFileCommand(improvedEditor);
const openCmd = new OpenFileCommand(improvedEditor, 'hello.txt');
const saveCmd = new SaveFileCommand(improvedEditor);

// 执行命令
improvedEditor.execute(newCmd);
improvedEditor.execute(openCmd);
improvedEditor.execute(saveCmd);

// 撤销命令
console.log('\n【撤销操作】');
improvedEditor.undo(saveCmd);
improvedEditor.undo(openCmd);
improvedEditor.undo(newCmd);

console.log('\n✅ 优点体现：');
console.log('   • 编辑器不需要知道具体的操作逻辑');
console.log('   • 每个命令都是独立的对象，可以灵活处理');
console.log('   • 轻松实现了撤销功能');

// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('【第三部分】命令模式的高级应用');
console.log('='.repeat(80));

/**
 * 🚀 应用1：命令队列（历史记录）
 */
console.log('\n【应用1】命令队列 - 记录所有操作历史');

class CommandHistory {
  constructor() {
    this.history = [];
  }

  // 记录命令
  push(command) {
    this.history.push(command);
    console.log(`  📝 [记录] 命令已加入历史，现在有 ${this.history.length} 条记录`);
  }

  // 撤销最后一条命令
  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      console.log(`  ↩️  撤销成功，剩余 ${this.history.length} 条记录`);
    } else {
      console.log('  ⚠️  没有可撤销的操作');
    }
  }

  // 查看历史
  showHistory() {
    console.log('  📋 操作历史：');
    this.history.forEach((cmd, index) => {
      console.log(`     ${index + 1}. ${cmd.constructor.name}`);
    });
  }
}

console.log('🎬 演示：使用命令队列管理历史操作');

const history = new CommandHistory();
const editor2 = new ImprovedTextEditor();

const cmd1 = new NewFileCommand(editor2);
const cmd2 = new OpenFileCommand(editor2, 'photo.jpg');
const cmd3 = new SaveFileCommand(editor2);

// 执行命令并记录到历史
history.push(cmd1);
editor2.execute(cmd1);

history.push(cmd2);
editor2.execute(cmd2);

history.push(cmd3);
editor2.execute(cmd3);

// 查看历史
history.showHistory();

// 撤销
console.log('\n【执行撤销操作】');
history.undo();
history.undo();

// ============================================================================

/**
 * 🚀 应用2：宏命令（Macro Command）
 * 
 * 将多个命令组合成一个命令
 * 就像：一键关闭所有窗口、一键调整所有参数等
 */
console.log('\n【应用2】宏命令 - 组合多个命令成一个');

class MacroCommand {
  constructor(commands = []) {
    this.commands = commands;
  }

  // 添加子命令
  addCommand(command) {
    this.commands.push(command);
  }

  // 一次性执行所有子命令
  execute() {
    console.log('  🎬 [宏命令开始执行]');
    this.commands.forEach(cmd => cmd.execute());
    console.log('  ✅ [宏命令执行完毕]');
  }

  // 一次性撤销所有子命令（反向执行）
  undo() {
    console.log('  ↩️  [宏命令撤销开始]');
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
    console.log('  ✅ [宏命令撤销完毕]');
  }
}

console.log('🎬 演示：一键启动编辑器（新建→打开→保存）');

const macroCmd = new MacroCommand();
const editor3 = new ImprovedTextEditor();

macroCmd.addCommand(new NewFileCommand(editor3));
macroCmd.addCommand(new OpenFileCommand(editor3, 'template.txt'));
macroCmd.addCommand(new SaveFileCommand(editor3));

macroCmd.execute();

console.log('\n【撤销宏命令】');
macroCmd.undo();

// ============================================================================

/**
 * 🚀 应用3：命令队列 + 异步延迟执行
 */
console.log('\n【应用3】延迟执行和异步命令');

class AsyncCommand {
  constructor(editor, action, delay = 1000) {
    this.editor = editor;
    this.action = action;
    this.delay = delay;
  }

  execute() {
    console.log(`  ⏱️  [命令创建] 将在 ${this.delay}ms 后执行`);
    setTimeout(() => {
      this.action();
      console.log('  ✅ [延迟命令已执行]');
    }, this.delay);
  }

  undo() {
    console.log('  ↩️  [异步撤销] 异步命令无法撤销');
  }
}

console.log('🎬 演示：延迟执行命令（模拟网络请求后的操作）');

const editor4 = new ImprovedTextEditor();
const asyncCmd = new AsyncCommand(editor4, () => {
  editor4.content = '从服务器获取的内容';
  console.log('  💾 从服务器获取数据完成');
}, 800);

asyncCmd.execute();

// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('【第四部分】实战案例：遥控器控制电视');
console.log('='.repeat(80));

console.log('\n🎬 完整案例：用遥控器控制电视（命令模式的经典场景）\n');

// 电视机（接收者）
class TV {
  constructor(name) {
    this.name = name;
    this.isOn = false;
    this.volume = 50;
    this.channel = 1;
  }

  turnOn() {
    this.isOn = true;
    console.log(`  📺 ${this.name} 已打开`);
  }

  turnOff() {
    this.isOn = false;
    console.log(`  📺 ${this.name} 已关闭`);
  }

  volumeUp() {
    if (this.volume < 100) {
      this.volume += 10;
      console.log(`  🔊 音量提升到 ${this.volume}`);
    }
  }

  volumeDown() {
    if (this.volume > 0) {
      this.volume -= 10;
      console.log(`  🔉 音量降低到 ${this.volume}`);
    }
  }

  changeChannel(ch) {
    this.channel = ch;
    console.log(`  📡 切换到第 ${ch} 频道`);
  }
}

// 开电视命令
class TurnOnTVCommand {
  constructor(tv) {
    this.tv = tv;
  }

  execute() {
    this.tv.turnOn();
  }

  undo() {
    this.tv.turnOff();
  }
}

// 关电视命令
class TurnOffTVCommand {
  constructor(tv) {
    this.tv = tv;
  }

  execute() {
    this.tv.turnOff();
  }

  undo() {
    this.tv.turnOn();
  }
}

// 音量增加命令
class VolumeUpCommand {
  constructor(tv) {
    this.tv = tv;
    this.previousVolume = 0;
  }

  execute() {
    this.previousVolume = this.tv.volume;
    this.tv.volumeUp();
  }

  undo() {
    this.tv.volume = this.previousVolume;
    console.log(`  🔊 音量恢复到 ${this.previousVolume}`);
  }
}

// 切换频道命令
class ChangeChannelCommand {
  constructor(tv, channel) {
    this.tv = tv;
    this.channel = channel;
    this.previousChannel = 0;
  }

  execute() {
    this.previousChannel = this.tv.channel;
    this.tv.changeChannel(this.channel);
  }

  undo() {
    this.tv.channel = this.previousChannel;
    console.log(`  📡 频道切回 ${this.previousChannel}`);
  }
}

// 遥控器（调用者）
class RemoteControl {
  constructor() {
    this.lastCommand = null;
  }

  setCommand(command) {
    this.lastCommand = command;
  }

  pressButton() {
    if (this.lastCommand) {
      this.lastCommand.execute();
    }
  }

  pressUndo() {
    if (this.lastCommand) {
      this.lastCommand.undo();
    }
  }
}

// 使用示例
console.log('🎬 场景：小明用遥控器看电视\n');

const tv = new TV('三星电视');
const remote = new RemoteControl();

console.log('【步骤1】打开电视');
remote.setCommand(new TurnOnTVCommand(tv));
remote.pressButton();

console.log('\n【步骤2】增加音量');
remote.setCommand(new VolumeUpCommand(tv));
remote.pressButton();
remote.pressButton();

console.log('\n【步骤3】切换频道');
remote.setCommand(new ChangeChannelCommand(tv, 5));
remote.pressButton();

console.log('\n【步骤4】突然想起来不想看第5频道，点击撤销');
remote.pressUndo();

console.log('\n【步骤5】关闭电视');
remote.setCommand(new TurnOffTVCommand(tv));
remote.pressButton();

// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('【第五部分】命令模式总结');
console.log('='.repeat(80));

console.log(`
📋 【命令模式的核心要素】

1️⃣  Command（命令接口的概念）
   - 在 JS 中就是一个对象，有 execute() 和 undo() 方法
   - 每个命令代表一个操作

2️⃣  ConcreteCommand（具体命令）
   - TurnOnTVCommand、SaveFileCommand 等
   - 实现具体的业务逻辑

3️⃣  Invoker（调用者/请求者）
   - RemoteControl、ImprovedTextEditor 等
   - 知道如何触发一个命令，但不知道命令的具体实现

4️⃣  Receiver（接收者）
   - TV、TextEditor 等
   - 知道如何执行与请求相关的操作

5️⃣  Client（客户端）
   - 创建具体命令对象，并设定其接收者

┌─────────────────────────────────────────────┐
│          命令模式的执行流程                   │
├─────────────────────────────────────────────┤
│ 1. Client 创建 ConcreteCommand 对象          │
│ 2. Client 将命令对象给 Invoker              │
│ 3. Invoker 调用 command.execute()            │
│ 4. ConcreteCommand 执行，调用 Receiver 的方法│
│ 5. Invoker 可以调用 command.undo() 来撤销   │
└─────────────────────────────────────────────┘

✅ 【命令模式的优点】

✓ 解耦：请求者和接收者解耦，降低耦合度
✓ 灵活：可以轻松添加新的命令，无需修改已有代码（开闭原则）
✓ 撤销/重做：天生支持撤销、重做功能
✓ 排队执行：可以把命令放入队列，按顺序执行
✓ 延迟执行：可以延迟执行命令
✓ 记录日志：可以把执行过的命令记录下来
✓ 宏命令：可以组合多个命令成一个新命令
✓ 事务：可以实现事务功能（全部成功或全部失败）

❌ 【命令模式的缺点】

✗ 增加类的数量：每个命令都是一个类，可能导致类数量爆炸
✗ 代码复杂度增加：对于简单操作可能过度设计
✗ 内存开销：每个命令对象都需要占用内存

📊 【适用场景】

🎯 需要支持撤销/重做功能
🎯 需要记录操作历史
🎯 需要实现事务功能
🎯 需要对命令进行排队处理
🎯 需要支持异步执行
🎯 需要支持宏命令（组合多个命令）
🎯 需要降低对象之间的耦合度

💻 【前端中的实际应用】

• 编辑器的撤销/重做功能（VS Code、Figma 等）
• 表单的提交/取消
• 游戏的存档/读档
• 操作系统的命令行
• Git 的命令系统
• Redux 的 Action（本质也是命令模式）
• 事件系统和事件委托
• 工作流自动化和任务队列
`);

console.log('\n' + '='.repeat(80));
console.log('✨ 命令模式讲解完毕！希望您理解透彻了 ~');
console.log('='.repeat(80) + '\n');
