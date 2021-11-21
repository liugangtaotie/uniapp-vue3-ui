<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-divider
          :type="type"
          :borderColor="borderColor"
          :bg-color="bgColor"
          @click="click"
          :half-width="halfWidth"
          :color="color"
          :font-size="fontSize"
          >{{ text }}</u-divider
        >
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">提示内容</view>
        <u-subsection :list="['没有更多了', '到底了']" @change="textChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">单边线宽</view>
        <u-subsection
          current="1"
          :list="['50', '150', '250']"
          @change="halfWidthChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">横线颜色</view>
        <u-subsection
          :list="['#dcdfe6', 'primary', 'error', 'warning', 'success']"
          @change="borderColorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">内容样式</view>
        <u-subsection :list="['默认', '自定义']" @change="contentChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { color } from "@UVIEW/libs/function/color";

export default defineComponent({
  name: "ComponentsDivider",

  setup(props: any) {
    let state = reactive({
      text: "没有更多了",
      bgColor: "#fafafa",
      halfWidth: 150,
      borderColor: "#dcdfe6",
      type: "primary",
      color: "#909399",
      fontSize: "26" as any,
    });

    // 点击提示内容
    function textChange(index) {
      state.text = index == 0 ? "没有更多了" : "到底了";
    }

    // 点击单边线宽
    function halfWidthChange(index) {
      state.halfWidth = index == 0 ? 50 : index == 1 ? 150 : 250;
    }

    // 点击横线颜色
    function borderColorChange(index) {
      if (index == 0) {
        state.borderColor = "#dcdfe6";
      } else {
        // 因为border-color参数优先级高于type，要让type起作用，就需要设置border-color为空
        state.borderColor = "";
        state.type =
          index == 1 ? "primary" : index == 2 ? "error" : index == 3 ? "warning" : "success";
      }
    }

    // 点击内容样式
    function contentChange(index) {
      if (index == 0) {
        state.color = "#909399";
        state.fontSize = 26;
      } else {
        state.color = color["primary"];
        state.fontSize = 30;
      }
    }

    function click() {
      console.log("click");
    }

    return {
      ...toRefs(state),
      textChange,
      halfWidthChange,
      borderColorChange,
      contentChange,
      click,
    };
  },
});
</script>

<style scoped lang="scss">
</style>
