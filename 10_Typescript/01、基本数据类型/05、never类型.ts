//怎么表达“这个地方永远不应该有数据”

type A = "小满" | "大满" | "超大满" | "小小满";

function isXiaoMan(value: A) {
  switch (value) {
    case "小满":
      break;
    case "大满":
      break;
    case "超大满":
      break;
    default:
    //是用于场景兜底逻辑
    // const error:never = value;
    // return error
  }
}
