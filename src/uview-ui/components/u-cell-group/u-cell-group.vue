<template>
  <view class="u-cell-box">
    <view class="u-cell-title" v-if="title" :style="titleStyle">
      {{ title }}
    </view>
    <view class="u-cell-item-box" :class="{ 'u-border-bottom u-border-top': border }">
      <slot />
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "u-cell-group",

  props: {
    // 分组标题
    title: {
      type: String,
      default: "",
    },
    // 是否显示分组list上下边框
    border: {
      type: Boolean,
      default: true,
    },
    // 分组标题的样式，对象形式，注意驼峰属性写法
    // 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
    titleStyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-cell-box {
  width: 100%;
}

.u-cell-title {
  padding: 30rpx 32rpx 10rpx 32rpx;
  font-size: 30rpx;
  color: $u-tips-color;
  text-align: left;
}

.u-cell-item-box {
  flex-direction: row;
  background-color: #fff;
}
</style>
