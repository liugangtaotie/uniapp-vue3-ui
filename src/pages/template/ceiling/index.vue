<template>
  <view class="home">
    <view class="single-model bg-color-primary">光明寂照遍河沙，凡圣含灵共一家</view>
    <view class="single-model bg-color-container">一念不生全体现，六根才动被云遮</view>
    <view class="sticky flex-center">凡所有相皆是虚妄，若见诸相非相，即见如来</view>
    <view class="single-model bg-color-container">断除烦恼重增病，趋向真如亦是邪</view>
    <view class="single-model bg-color-primary">随顺世缘无挂碍，涅槃生死等空花</view>
    <view class="single-model bg-color-container">净洗念珠重换线，坚持佛号莫停声</view>
  </view>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ComponentsCeiling",

  setup() {
    return {};
  },
});
</script>

<style lang='scss' scoped>
.single-model {
  height: 500rpx;
  text-align: center;
}

.sticky {
  position: -webkit-sticky;

  /* #endif */
  position: sticky;
  top: var(--window-top);
  z-index: 99;

  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  height: 60rpx;
  line-height: 60rpx;
  color: #fff;
  background-color: red;
}
</style>
