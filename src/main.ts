import { createApp } from "vue";
import App from "./App.vue";

// 引入全局uView
import uView from "./uview-ui";

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from "@/common/locales/zh.js";
import English from "@/common/locales/en.js";

// VueI18n;
// import VueI18n from "vue-i18n";

// const i18n = new VueI18n({
//   // 默认语言
//   locale: "zh",
//   // 引入语言文件
//   messages: {
//     zh: Chinese,
//     en: English,
//   },
// });

const app = createApp(App);

// 引入全局uView
app.use(uView);

// VueI18n
// app.use(VueI18n);

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
// app.config.globalProperties._i18n = i18n;

// 此处为演示Vue.prototype使用，非uView的功能部分
app.config.globalProperties.vuePrototype = "枣红";

app.mount("#app");
