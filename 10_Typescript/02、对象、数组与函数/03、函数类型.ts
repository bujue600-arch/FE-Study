const fn = (array: number[], ...items: any[]): any[] => {
  console.log(array, items);
  return items;
};

let a11: number[] = [1, 2, 3];

fn(a11, "4", "5", "6");
