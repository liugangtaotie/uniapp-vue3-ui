<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-loading :mode="mode" :show="show" :color="color" :size="size"></u-loading>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式</view>
        <u-subsection :list="['圆圈', '花朵']" @change="modeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">颜色(只对圆圈模式有效)</view>
        <u-subsection
          :list="['default', 'primary', 'error', 'warning', 'success']"
          @change="colorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">尺寸(单位rpx)</view>
        <u-subsection current="1" :list="['28', '34', '40']" @change="sizeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">是否显示</view>
        <u-subsection current="1" :list="['否', '是']" @change="showChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { color } from "@UVIEW/libs/function/color";

export default defineComponent({
  name: "ComponentsLoading",

  setup() {
    let state = reactive({
      mode: "circle",
      color: "#c7c7c7",
      size: "34",
      show: true,
    });

    function modeChange(index) {
      state.mode = index == 0 ? "circle" : "flower";
    }

    function colorChange(index) {
      if (index == 0) {
        state.color = "#c7c7c7";
      } else {
        let color =
          index == 1 ? "primary" : index == 2 ? "error" : index == 3 ? "warning" : "success";
        state.color = color[color];
      }
    }

    function sizeChange(index) {
      state.size = index == 0 ? "28" : index == 1 ? "34" : "40";
    }

    function showChange(index) {
      // 两个!!可以把0变成false，1变成true
      state.show = !!index;
    }

    // 选中某个复选框时，由checkbox时触发
    function checkboxChange(e) {
      //console.log(e);
    }

    // 选中任一checkbox时，由checkbox-group触发
    // function checkboxGroupChange(e) {
    //   state.result = e;
    //   // console.log(state.result);
    // }

    return {
      ...toRefs(state),
      modeChange,
      colorChange,
      sizeChange,
      showChange,
      checkboxChange,
    };
  },
});
</script>

<style scoped lang="scss">
</style>
