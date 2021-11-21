/**
 * style 对象转字符串
 * @param {Object} styleObj
 */
function styleObjToString(styleObj) {
  return Object.keys(styleObj)
    .map((key) => {
      return `${key}:${styleObj[key]};`;
    })
    .join("");
}

module.exports.styleObjToString = styleObjToString;
