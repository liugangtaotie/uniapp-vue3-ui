process.env.UNI_USING_VUE3 = true;
process.env.UNI_USING_VUE3_OPTIONS_API = true;

const path = require("path");

// common parse path
function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  // eslint-disable-next-line no-dupe-keys
  chainWebpack: (config) => {
    // 可以将vue标签内样式px转换vw的 webpack loader
    //  config.module
    //  .rule("vue")
    //  .test(/\.vue$/)
    //  .use("style-vw-loader")
    //  .loader("style-vw-loader")
    //  .options({ viewportWidth: 375 }); // 解决使用vanui屏幕适配宽度为375

    // 配置别名  不配置会报错
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@STA", resolve("src/static"))
      .set("@ASS", resolve("src/assets"))
      .set("@API", resolve("src/api"))
      .set("@COP", resolve("src/components"))
      .set("@COM", resolve("src/common"))
      .set("@PAGES", resolve("src/pages"))
      .set("@UVIEW", resolve("src/uview-ui"));

    return config;
  },
};
