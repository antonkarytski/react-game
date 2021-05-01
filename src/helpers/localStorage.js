export function getSavedNumberVal(val, defaultVal) {
  return Number(localStorage.getItem(val) || defaultVal);
}
