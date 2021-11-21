<template>
  <view class="nav-wrap">
    <view class="nav-title">
      <image
        class="logo"
        src="https://jkt.bsoft.com.cn/hcn-web/mini_images/images/bsoft.png"
        mode="widthFix"
      ></image>
      <view class="nav-info">
        <view class="nav-title__text"> bs common UI next</view>
        <view class="nav-slogan"> 多平台快速开发的UI框架（基于vue3） </view>
      </view>
    </view>
    <view class="nav-desc">
      {{ desc }}
    </view>
    <view class="lang" @tap="switchLang">
      <u-icon size="46" color="warning" :name="lang"></u-icon>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsPageNav",

  props: {
    desc: String,
    title: String,
  },

  setup(props) {
    const lang = computed(() => {
      return "zh";
      // return instanceProxy.$i18n.locale == "zh" ? "zh" : "en";
    });

    // 点击切换语言
    function switchLang() {
      // instanceProxy.$i18n.locale = instanceProxy.$i18n.locale == "en" ? "zh" : "en";
      // this.vuex_tabbar[0].text = this.$t("nav.components");
      // this.vuex_tabbar[1].text = this.$t("nav.js");
      // this.vuex_tabbar[2].text = this.$t("nav.template");

      uni.setNavigationBarTitle({
        title: instanceProxy.$t(props.title),
      });
    }

    return {
      ...toRefs(props),
      lang,
      switchLang,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.nav-wrap {
  position: relative;
  padding: 15px;
}

.lang {
  position: absolute;
  top: 15px;
  right: 15px;
}

.nav-title {
  /* #ifndef APP-NVUE */
  display: flex;

  /* #endif */
  flex-direction: row;
  align-items: center;
}

.nav-info {
  margin-left: 15px;
}

.nav-title__text {
  /* #ifndef APP-NVUE */
  display: flex;
  font-size: 25px;
  font-weight: bold;

  /* #endif */
  color: $u-main-color;
}

.logo {
  width: 70px;

  /* #ifndef APP-NVUE */
  height: auto;

  /* #endif */
}

.nav-slogan {
  font-size: 14px;
  color: $u-tips-color;
}

.nav-desc {
  margin-top: 10px;
  font-size: 14px;
  color: $u-content-color;
}
</style>
