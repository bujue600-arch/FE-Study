const arrayToTree = (arr) => {
  const map = {};
  const roots = [];

  arr.forEach((obj) => {
    map[obj.id] = { ...obj, children: [] };
  });

  arr.forEach((obj) => {
    if (obj.parentId === null) roots.push(map[obj.id]);
    else map[obj.parentId].children.push(map[obj.id]);
  });

  return roots;
};

const items = [
  { id: 1, name: "部门A", parentId: null }, // 顶级部门
  { id: 2, name: "部门B", parentId: 1 }, // 属于部门A
  { id: 3, name: "部门C", parentId: 1 }, // 属于部门A
  { id: 4, name: "部门D", parentId: 2 }, // 属于部门B
];

console.log(JSON.stringify(arrayToTree(items), null, 3));
