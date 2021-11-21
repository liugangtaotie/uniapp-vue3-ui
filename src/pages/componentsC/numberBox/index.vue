<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-number-box
          v-model="value"
          :bg-color="bgColor"
          :color="color"
          :min="0"
          :step="step"
          :disabled="disabled"
          @change="change"
          @focus="focus"
        ></u-number-box>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">初始值</view>
        <u-subsection :list="[1, 5, 18]" @change="valueChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义样式</view>
        <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">是否禁用</view>
        <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">步进值</view>
        <u-subsection :list="[1, 3, 5, 8]" @change="stepChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsNumberBox",

  setup() {
    let state = reactive({
      value: 1,
      bgColor: "#F2F3F5",
      color: "#323233",
      disabled: false,
      step: 1,
    });

    function valueChange(index) {
      state.value = index == 0 ? 1 : index == 1 ? 5 : 18;
    }

    function styleChange(index) {
      if (index == 0) {
        state.bgColor = "#ff6d00";
        state.color = "#fff";
      } else {
        state.bgColor = "#F2F3F5";
        state.color = "#323233";
      }
    }

    function disabledChange(index) {
      state.disabled = index == 0 ? true : false;
    }

    function stepChange(index) {
      state.step = index == 0 ? 1 : index == 1 ? 3 : index == 2 ? 5 : 8;
    }

    function change(e) {
      //console.log(e.value);
    }

    function focus() {
      console.log("focus");
    }

    return {
      ...toRefs(state),
      valueChange,
      styleChange,
      disabledChange,
      stepChange,
      change,
      focus,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
