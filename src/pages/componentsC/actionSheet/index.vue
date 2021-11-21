<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-button @click="showAction">唤起ActionSheet</u-button>
        <u-action-sheet
          :cancel-btn="cancel"
          :mask-close-able="maskClick"
          :tips="tips"
          @click="click"
          :list="list"
          v-model="show"
          :safe-area-inset-bottom="true"
        ></u-action-sheet>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">取消按钮</view>
        <u-subsection :list="['是', '否']" @change="cancelChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">点击遮罩关闭</view>
        <u-subsection :list="['是', '否']" @change="maskClickChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsActionSheet",

  setup() {
    let state = reactive({
      list: [
        {
          text: "最是人间留不住",
        },
        {
          text: "朱颜辞镜花辞树",
          disabled: true,
        },
        {
          text: "正是江南好风景",
          subText: "春江水暖鸭先知",
        },
        {
          text: "落花时节又逢君",
        },
      ],
      tips: {
        text: "",
      },
      show: false,
      cancel: true,
      maskClick: true,
    });

    function showAction() {
      state.show = true;
    }

    function click(index) {
      uni.showToast({
        icon: "success",
        title: "点击了第" + (index + 1) + "项",
      });
    }

    function tipsChange(index) {
      if (index == 0) state.show = true;
      state.tips.text = index == 0 ? "请谨慎执行您的操作" : "";
    }

    function cancelChange(index) {
      state.show = true;
      state.cancel = index == 0 ? true : false;
    }

    function maskClickChange(index) {
      if (index == 1) state.cancel = true;
      state.show = true;
      state.maskClick = index == 0 ? true : false;
    }

    return {
      ...toRefs(state),
      showAction,
      click,
      tipsChange,
      cancelChange,
      maskClickChange,
    };
  },
});
</script>


<style lang="scss" scoped>
.wrap {
  padding: 24rpx;
}
</style>
