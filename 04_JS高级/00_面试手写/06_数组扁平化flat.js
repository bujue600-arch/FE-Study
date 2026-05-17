// ========================================
// 第六节：手写数组扁平化 (Array Flat)
// ========================================

// 一、什么是数组扁平化？
// 简单说：把多层嵌套的数组 "拍平" 成一维数组
//
// 举个例子：
// 输入: [1, [2, [3, [4, 5]]], 6]
// 输出: [1, 2, 3, 4, 5, 6]
//
// 就像把一个 "俄罗斯套娃" 一层层打开，把里面的东西都拿出来放一排

// 二、原生 flat() 方法
// ES2019 引入了 Array.prototype.flat()
const arr1 = [1, [2, [3, [4, 5]]], 6];

console.log(arr1.flat());       // [1, 2, [3, [4, 5]], 6]  默认只展开一层
console.log(arr1.flat(2));      // [1, 2, 3, [4, 5], 6]    展开两层
console.log(arr1.flat(Infinity)); // [1, 2, 3, 4, 5, 6]    全部展开（面试重点！）
console.log(arr1.flat(Infinity)); // 等价于 flat(Infinity)，不管嵌套多深都展开

// 三、手写实现（面试重点！）
// 下面我教你 4 种方法，从简单到高级

// ----------------------------------------
// 方法一：递归 + reduce（最经典，面试常考）
// ----------------------------------------
// 思路：
// 1. 遍历数组的每一项
// 2. 如果这一项还是数组，就递归调用自己继续展开
// 3. 如果这一项不是数组，就直接放进结果里
//
// 用 reduce 的好处：它天生就是 "把数组归并成一个值" 的工具
// 我们这里归并的结果就是一个扁平的新数组

function flat1(arr) {
  return arr.reduce((prev, cur) => {
    // 判断当前元素是不是数组
    if (Array.isArray(cur)) {
      // 是数组？递归展开，然后用 concat 拼接
      return prev.concat(flat1(cur));
    } else {
      // 不是数组？直接放进结果
      return prev.concat(cur);
    }
  }, []); // 初始值是空数组 []
}

// 测试
console.log("方法一：", flat1([1, [2, [3, [4, 5]]], 6]));
// 输出: [1, 2, 3, 4, 5, 6] ✅

// 写成箭头函数更简洁（面试时写这个更有范儿）：
const flat1Arrow = arr =>
  arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flat1Arrow(cur) : cur),
    []
  );

console.log("方法一(箭头)：", flat1Arrow([1, [2, [3, [4, 5]]], 6]));

// ----------------------------------------
// 方法二：递归 + concat（最直观，好理解）
// ----------------------------------------
// 思路：
// 1. 创建一个空数组 result
// 2. 遍历原数组每一项
// 3. 是数组？递归展开后 concat 到 result
// 4. 不是数组？直接 concat 到 result
// 5. 返回 result

function flat2(arr) {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      // 递归展开后拼接
      result = result.concat(flat2(item));
    } else {
      // 直接拼接
      result.push(item);
    }
  });
  return result;
}

console.log("方法二：", flat2([1, [2, [3, [4, 5]]], 6]));
// 输出: [1, 2, 3, 4, 5, 6] ✅

// ----------------------------------------
// 方法三：展开运算符 + some（巧妙写法）
// ----------------------------------------
// 思路：
// 1. 只要数组里还有 "子数组"（用 some 检测）
// 2. 就用展开运算符 ... 展开一层
// 3. 重复这个过程直到没有子数组
//
// 就像：反复用熨斗熨衣服，直到没有褶皱

function flat3(arr) {
  // 用 some 检测：是否还有元素是数组
  while (arr.some(item => Array.isArray(item))) {
    // 有？那就用 concat + 展开运算符展开一层
    arr = [].concat(...arr);
  }
  return arr;
}

console.log("方法三：", flat3([1, [2, [3, [4, 5]]], 6]));
// 输出: [1, 2, 3, 4, 5, 6] ✅

// 详细解释 [].concat(...arr)：
// 假设 arr = [1, [2, 3], 4]
// ...arr 展开后变成：1, [2, 3], 4（三个独立参数）
// [].concat(1, [2, 3], 4) 结果是 [1, 2, 3, 4]
// concat 会自动展开一层嵌套的数组！

// ----------------------------------------
// 方法四：栈模拟（非递归，性能最好）
// ----------------------------------------
// 思路：
// 1. 用一个栈（数组）来模拟递归
// 2. 从右往左把元素压入栈（这样出栈时是从左往右）
// 3. 每次从栈顶取一个元素
// 4. 是数组？展开后压回栈
// 5. 不是数组？放进结果
//
// 为什么从右往左？因为栈是后进先出（LIFO）
// 从右往左压栈，出来就是从左往右，保证顺序正确

function flat4(arr) {
  const result = [];
  const stack = [...arr]; // 把数组复制一份作为初始栈

  while (stack.length > 0) {
    // 从栈顶取一个元素（pop 取最后一个）
    const item = stack.pop();

    if (Array.isArray(item)) {
      // 是数组？展开后压回栈
      // 注意：用 push，这样展开后的元素会按原顺序出栈
      stack.push(...item);
    } else {
      // 不是数组？放进结果（用 unshift 放到前面，因为是倒序遍历的）
      result.unshift(item);
    }
  }

  return result;
}

console.log("方法四：", flat4([1, [2, [3, [4, 5]]], 6]));
// 输出: [1, 2, 3, 4, 5, 6] ✅

// 四、进阶：支持指定展开深度
// 原生 flat() 可以传数字控制展开几层，我们也来实现一下

function flatWithDepth(arr, depth = 1) {
  // 如果深度是 0，直接返回原数组（不需要展开）
  if (depth === 0) return arr;

  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      // 递归时深度减 1
      return prev.concat(flatWithDepth(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}

const arr2 = [1, [2, [3, [4, 5]]], 6];
console.log("深度1：", flatWithDepth(arr2, 1)); // [1, 2, [3, [4, 5]], 6]
console.log("深度2：", flatWithDepth(arr2, 2)); // [1, 2, 3, [4, 5], 6]
console.log("深度3：", flatWithDepth(arr2, 3)); // [1, 2, 3, 4, 5, 6]
console.log("Infinity：", flatWithDepth(arr2, Infinity)); // [1, 2, 3, 4, 5, 6]

// 五、使用 Symbol.isConcatSpreadable（冷门但有趣）
// 这个 Symbol 可以控制 concat 的行为
// 设置为 true 后，对象在 concat 时会被当作数组展开

const arr3 = [1, [2, [3, [4, 5]]], 6];
arr3[Symbol.isConcatSpreadable] = true;
console.log("Symbol：", [].concat(...arr3));

// ========================================
// 面试考点总结
// ========================================
//
// 1. 最常考：方法一（reduce + 递归），必须会写
// 2. 理解原理：递归的本质是 "遇到数组就继续展开"
// 3. 进阶加分：能实现指定深度的 flat
// 4. 知道区别：flat() 默认展开 1 层，flat(Infinity) 全部展开
// 5. 面试追问：
//    - "如果数组很大，递归会不会栈溢出？" → 用方法四（栈模拟）
//    - "能不能不用递归？" → 用方法三（while + some）或方法四
//    - "flat 和 flatMap 的区别？" → flatMap = map + flat(1)

// ========================================
// 练习题
// ========================================
// 试着实现一个 flat，要求：
// 1. 支持指定深度
// 2. 不使用递归（用循环实现）
// 3. 处理空数组的情况
