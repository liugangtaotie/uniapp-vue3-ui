// 性别
export function filterSex(val: any) {
  if (!val) {
    return "";
  }
  if (val == 1) {
    return "男";
  } else {
    return "女";
  }
}
