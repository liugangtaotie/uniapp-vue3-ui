<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-link :color="color" :font-size="fontSize" :under-line="underLine" :href="href"
          >点此链接，跳转uView官网</u-link
        >
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">下划线</view>
        <u-subsection :list="['显示', '隐藏']" @change="underLineChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义样式</view>
        <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { color } from "@UVIEW/libs/function/color";

export default defineComponent({
  name: "ComponentsLink",

  setup() {
    let state = reactive({
      href: "https://www.uviewui.com",
      underLine: true,
      fontSize: 28,
      color: "#2979ff",
    });

    function underLineChange(index) {
      state.underLine = index == 0 ? true : false;
    }

    function styleChange(index) {
      if (index == 0) {
        state.color = color["tipsColor"];
        state.fontSize = 34;
      } else {
        state.color = color["primary"];
        state.fontSize = 28;
      }
    }

    return {
      ...toRefs(state),
      underLineChange,
      styleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
