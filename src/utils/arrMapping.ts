export const arrMapping = (
  arr: Array<any>,
  itemProp: number | string,
  compareProp: number | string,
  newValue: any
): Array<any> => {
  return arr.map((item) => {
    if (item[itemProp] === compareProp) {
      return { ...item, ...newValue };
    }
    return item;
  });
};
