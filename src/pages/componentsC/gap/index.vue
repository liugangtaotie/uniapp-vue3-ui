<!--
 * @Desc: ---   ----
 * @Date: 2020-04-22 12:29:21
 * @LastEditors: 王
 * @LastEditTime: 2020-04-22 18:33:28
 -->
<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-gap
          :bg-color="bgColor"
          :height="height"
          :margin-top="marginTop"
          :margin-bottom="marginBottom"
        ></u-gap>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">背景颜色</view>
        <u-subsection
          :list="['default', 'primary', 'error', 'warning', 'success']"
          @change="bgColorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">高度</view>
        <u-subsection :list="['30', '50', '70']" @change="heightChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">上下外边距</view>
        <u-subsection :list="['30', '50', '70']" @change="marginChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { color } from "../../../uview-ui/libs/function/color";

export default defineComponent({
  name: "ComponentsGap",

  setup() {
    let state: any = reactive({
      height: 30,
      bgColor: color.bgColor,
      marginTop: 30,
      marginBottom: 30,
    });

    function bgColorChange(index) {
      let colors =
        index == 0
          ? "default"
          : index == 1
          ? "primary"
          : index == 2
          ? "error"
          : index == 3
          ? "warning"
          : "success";
      state.bgColor = colors == "default" ? color["bgColor"] : color[colors];
    }

    function heightChange(index) {
      state.height = index == 0 ? 30 : index == 1 ? 50 : 70;
      console.log("height:", state.height);
    }

    function marginChange(index) {
      state.marginTop = ["30", "50", "70"][index];
      state.marginBottom = state.marginTop;
    }

    return {
      ...toRefs(state),
      marginChange,
      heightChange,
      bgColorChange,
    };
  },
});
</script>


<style lang="scss" scoped>
.wrap {
  padding: 24rpx;
}
</style>
