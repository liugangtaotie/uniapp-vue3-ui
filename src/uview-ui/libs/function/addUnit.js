// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit(value = "auto", unit = "rpx") {
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return Number(value) ? `${value}${unit}` : value;
}

module.exports.addUnit = addUnit;
