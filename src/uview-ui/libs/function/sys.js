function os() {
  return uni.getSystemInfoSync().platform;
}

function sys() {
  return uni.getSystemInfoSync();
}

module.exports.sys = {
  sys,
  os,
};
