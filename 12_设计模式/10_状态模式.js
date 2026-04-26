/**
 * ============================================
 *  【状态模式】讲解 - 前端实习生版本
 * ============================================
 * 
 * 讲师：老师
 * 学生：你（前端实习生）
 * 难度：中等
 * 核心思想：对象在其内部状态改变时改变它的行为
 * 
 */

/**
 * 【第一部分】生活中的状态模式 - 让你先有感觉
 * ============================================
 */

console.log('\n========== 【第一部分】生活场景 ==========\n');

// 我们先用最简单的例子：电灯开关
// 你有没有想过，一个电灯为什么可以开或关？
// 其实它就是在两个"状态"之间切换呢！

// 🔦 电灯的两个状态：
// 状态1：关闭状态 → 按开关 → 亮灯
// 状态2：打开状态 → 按开关 → 灭灯

console.log('【例子1】简单的电灯');
console.log('当前状态：关闭 ❌');
console.log('↓ 按下开关');
console.log('当前状态：打开 ✅\n');


/**
 * 【第二部分】没有状态模式的问题 - 这样写很糟糕！
 * ============================================
 */

console.log('========== 【第二部分】问题演示 ==========\n');

// 假设你现在要实现一个【人物角色的状态管理系统】
// 一个游戏人物有三个状态：健康、虚弱、死亡
// 在不同状态下，同样的"攻击"动作表现不同：

// ❌ 反面教材：坏的写法（充满 if-else）
class PlayerWithoutStatePattern {
  constructor(name) {
    this.name = name;
    this.state = 'healthy'; // 健康、weak、dead
    this.hp = 100;
  }

  // 问题：attack 函数变得超级复杂！
  attack(target) {
    if (this.state === 'healthy') {
      console.log(`${this.name} 发起强力攻击！造成 50 点伤害`);
      target.hp -= 50;
    } else if (this.state === 'weak') {
      console.log(`${this.name} 虚弱地攻击... 只造成 10 点伤害`);
      target.hp -= 10;
    } else if (this.state === 'dead') {
      console.log(`${this.name} 已经死了，无法进行任何操作！`);
    }
  }

  // 如果增加新状态，这个函数还要继续加 else if
  // 如果增加新动作方法（skill、defend等），每个都要重复写 if-else
  // 这就是【代码爆炸】的开始！😱
}

console.log('【不好的做法】充满 if-else 的代码：');
const player1 = new PlayerWithoutStatePattern('张三');
const player2 = new PlayerWithoutStatePattern('李四');

player1.attack(player2); // 张三 发起强力攻击！造成 50 点伤害
player1.state = 'weak';
player1.attack(player2); // 张三 虚弱地攻击... 只造成 10 点伤害
player1.state = 'dead';
player1.attack(player2); // 张三 已经死了，无法进行任何操作！

console.log('\n问题分析：');
console.log('❌ attack、skill、defend 每个方法都要写 if-else');
console.log('❌ 新增状态时，所有方法都要修改');
console.log('❌ 代码混乱，难以维护');
console.log('❌ 违反了开闭原则（对扩展开放，对修改关闭）\n');


/**
 * 【第三部分】什么是状态模式？ - 核心思想讲解
 * ============================================
 */

console.log('========== 【第三部分】状态模式的核心思想 ==========\n');

console.log('想象你是一个"状态管理员"：');
console.log('  • 当接到"攻击"命令时，不自己做决定');
console.log('  • 而是问当前的"状态对象"：你负责处理');
console.log('  • 每个"状态对象"都知道自己该怎么做');
console.log('  • 这样，添加新状态时，只需要新增"状态对象"，不需要修改原代码！\n');

console.log('类比理解：');
console.log('  现实：你去饭店点菜，服务员根据"你是否是会员"而收费不同');
console.log('  坏的做法：if-else 判断');
console.log('  好的做法：把"会员身份"这个"状态"交给专业的"收费对象"去处理\n');


/**
 * 【第四部分】状态模式的实现 - 用 JS 一步步演示
 * ============================================
 */

console.log('========== 【第四部分】实战演示 ==========\n');

// 第一步：定义"状态对象"的模板
// （之前你说忘了接口，在JS里，我们用一个普通的对象来模拟就行！）

class HealthyState {
  attack(player, target) {
    console.log(`🔥 ${player.name} 发起强力攻击！造成 50 点伤害`);
    target.receiveDamage(50);
  }

  skill(player, target) {
    console.log(`⚡ ${player.name} 使用必杀技！造成 100 点伤害`);
    target.receiveDamage(100);
  }

  defend(player) {
    console.log(`🛡️  ${player.name} 防御姿态！减少 30% 伤害`);
  }
}

class WeakState {
  attack(player, target) {
    console.log(`😔 ${player.name} 虚弱地轻击... 只造成 15 点伤害`);
    target.receiveDamage(15);
  }

  skill(player, target) {
    console.log(`😰 ${player.name} 太虚弱了，无法使用必杀技！`);
  }

  defend(player) {
    console.log(`😓 ${player.name} 勉强防御...效果不佳`);
  }
}

class DeadState {
  attack(player, target) {
    console.log(`💀 ${player.name} 已经死了，什么都做不了！`);
  }

  skill(player, target) {
    console.log(`💀 ${player.name} 已经死了，什么都做不了！`);
  }

  defend(player) {
    console.log(`💀 ${player.name} 已经死了，什么都做不了！`);
  }
}

// 第二步：定义"主角类"（Context 上下文）
// 核心特点：把行为委托给"状态对象"
class Player {
  constructor(name) {
    this.name = name;
    this.hp = 100;
    this.maxHp = 100;
    // 🎯 关键！当前状态由"状态对象"管理
    this.currentState = new HealthyState();
  }

  // 接收伤害的方法
  receiveDamage(damage) {
    this.hp -= damage;
    console.log(`  → ${this.name} 剩余 HP: ${this.hp}/${this.maxHp}`);
    this.updateState(); // 检查状态是否改变
  }

  // 检查并更新状态
  updateState() {
    if (this.hp <= 0) {
      this.currentState = new DeadState();
      console.log(`  ⚠️  ${this.name} 已死亡！`);
    } else if (this.hp <= 30) {
      this.currentState = new WeakState();
      console.log(`  ⚠️  ${this.name} 进入虚弱状态！`);
    } else if (this.hp < this.maxHp) {
      this.currentState = new HealthyState();
      console.log(`  ✅ ${this.name} 状态恢复正常`);
    }
  }

  // 🎯 这就是状态模式的精妙之处！
  // 这个方法永远不会改变，状态对象会根据不同情况做不同的事
  attack(target) {
    this.currentState.attack(this, target);
  }

  skill(target) {
    this.currentState.skill(this, target);
  }

  defend() {
    this.currentState.defend(this);
  }

  // 恢复HP
  recover(amount) {
    this.hp = Math.min(this.hp + amount, this.maxHp);
    console.log(`💚 ${this.name} 恢复了 ${amount} 点 HP，当前 HP: ${this.hp}/${this.maxHp}`);
    this.updateState();
  }
}

// 第三步：实际使用
console.log('【实战例子】角色战斗系统\n');

const hero = new Player('勇者');
const enemy = new Player('魔王');

console.log(`--- 初始状态 ---`);
console.log(`勇者 HP: ${hero.hp}`);
console.log(`魔王 HP: ${enemy.hp}\n`);

console.log(`--- 第一回合 ---`);
hero.attack(enemy);

console.log(`\n--- 第二回合 ---`);
enemy.attack(hero);

console.log(`\n--- 第三回合（勇者快要虚弱了）---`);
hero.attack(enemy);

console.log(`\n--- 第四回合 ---`);
console.log('敌人继续攻击...');
enemy.attack(hero);

console.log(`\n--- 勇者进入虚弱状态后再攻击 ---`);
hero.attack(enemy);
hero.skill(enemy); // 虚弱状态下使用必杀技

console.log(`\n--- 勇者尝试防御 ---`);
hero.defend();

console.log(`\n--- 勇者恢复一些体力 ---`);
hero.recover(60);
hero.attack(enemy); // 回到健康状态了，攻击力恢复！

console.log(`\n--- 魔王挂了 ---`);
while (enemy.hp > 0) {
  hero.attack(enemy);
}
hero.attack(enemy); // 魔王已死，无反应


/**
 * 【第五部分】为什么这是好设计？
 * ============================================
 */

console.log('\n\n========== 【第五部分】为什么这是好设计？ ==========\n');

console.log('✅ 优点分析：\n');

console.log('1️⃣  代码清晰');
console.log('   • attack()、skill() 方法永远不变');
console.log('   • 没有烦人的 if-else 语句');
console.log('   • 主要逻辑很容易理解\n');

console.log('2️⃣  易于扩展');
console.log('   • 想加新状态？新建一个 State 类就行');
console.log('   • 想加新动作？只需在每个 State 类里加方法');
console.log('   • 不需要修改 Player 类，符合开闭原则！\n');

console.log('3️⃣  责任分离');
console.log('   • Player 类只负责"委托"');
console.log('   • 具体的行为逻辑由各个 State 类负责');
console.log('   • 职责单一，容易测试\n');

console.log('❌ 缺点：\n');

console.log('1️⃣  代码稍微复杂一点');
console.log('   • 需要创建多个 State 类');
console.log('   • 状态少的系统可能过度设计\n');

console.log('2️⃣  对象创建多');
console.log('   • 每个状态都是一个对象');
console.log('   • 内存占用比 if-else 多一点\n');


/**
 * 【第六部分】真实案例 - 订单状态系统
 * ============================================
 */

console.log('========== 【第六部分】真实案例：订单管理系统 ==========\n');

// 订单的几个状态
class OrderState {
  // 由于 JS 没有真正的"接口"，我们用一个基类加"必须实现"的注释
  pay(order) {
    throw new Error('pay() 方法必须在子类中实现！');
  }

  cancel(order) {
    throw new Error('cancel() 方法必须在子类中实现！');
  }

  receive(order) {
    throw new Error('receive() 方法必须在子类中实现！');
  }
}

// 待支付状态
class PendingPaymentState extends OrderState {
  pay(order) {
    console.log(`✅ 订单 ${order.id} 支付成功！正在准备发货...`);
    order.setState(new ShippingState());
  }

  cancel(order) {
    console.log(`❌ 订单 ${order.id} 已取消（从待支付状态）`);
    order.setState(new CancelledState());
  }

  receive(order) {
    console.log(`❌ 错误！订单还没支付，怎么能收货呢？`);
  }
}

// 发货中状态
class ShippingState extends OrderState {
  pay(order) {
    console.log(`❌ 错误！订单已经支付了，无法重复支付`);
  }

  cancel(order) {
    console.log(`❌ 错误！已发货，无法取消`);
  }

  receive(order) {
    console.log(`📦 订单 ${order.id} 已收货！完成交易`);
    order.setState(new CompletedState());
  }
}

// 已完成状态
class CompletedState extends OrderState {
  pay(order) {
    console.log(`❌ 错误！订单已完成`);
  }

  cancel(order) {
    console.log(`❌ 错误！订单已完成，无法取消`);
  }

  receive(order) {
    console.log(`❌ 错误！订单已完成`);
  }
}

// 已取消状态
class CancelledState extends OrderState {
  pay(order) {
    console.log(`❌ 错误！订单已取消，无法支付`);
  }

  cancel(order) {
    console.log(`❌ 错误！订单已取消`);
  }

  receive(order) {
    console.log(`❌ 错误！订单已取消`);
  }
}

// 订单类（Context）
class Order {
  constructor(id) {
    this.id = id;
    this.state = new PendingPaymentState();
  }

  setState(newState) {
    this.state = newState;
  }

  // 这些方法永远不变，行为由 state 对象决定
  pay() {
    this.state.pay(this);
  }

  cancel() {
    this.state.cancel(this);
  }

  receive() {
    this.state.receive(this);
  }
}

// 使用案例
console.log('【订单生命周期演示】\n');
const order = new Order('ORD-001');

console.log('顾客尝试收货（还没支付）：');
order.receive();

console.log('\n顾客支付：');
order.pay();

console.log('\n顾客尝试支付（已经支付过了）：');
order.pay();

console.log('\n顾客收货：');
order.receive();

console.log('\n顾客尝试取消（已完成）：');
order.cancel();


/**
 * 【总结】
 * ============================================
 */

console.log('\n\n========== 【总结】 ==========\n');

console.log('🎓 状态模式的本质：');
console.log('   将状态的处理逻辑分离到独立的类中');
console.log('   让主类通过委托来改变行为\n');

console.log('🎓 什么时候用状态模式：');
console.log('   ✅ 对象有多个状态，不同状态有不同行为');
console.log('   ✅ 代码中有大量与状态相关的 if-else');
console.log('   ✅ 状态之间会频繁切换');
console.log('   ✅ 需要经常添加新的状态\n');

console.log('🎓 不用状态模式什么时候：');
console.log('   ❌ 状态很少（2-3 个）且基本不变');
console.log('   ❌ 简单的一次性脚本');
console.log('   ❌ 状态逻辑超级简单\n');

console.log('🎓 前端开发中的实际例子：');
console.log('   • 用户登录状态：未登录、已登录、登出中');
console.log('   • 请求状态：待发送、加载中、成功、失败');
console.log('   • 按钮状态：默认、悬停、按下、禁用');
console.log('   • 动画状态：准备、播放中、暂停、结束');
console.log('   • 游戏角色状态：健康、受伤、濒死、死亡\n');

console.log('💡 记住这一点就理解了：');
console.log('   "不是我来判断怎么做，而是让状态对象来告诉我怎么做！"\n');
