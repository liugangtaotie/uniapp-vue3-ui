<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-tag
          :text="text"
          :type="type"
          :shape="shape"
          :closeable="closeable"
          :mode="mode"
          @close="close"
          @click="click"
          :show="show"
          :size="size"
        />
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection :list="['light', 'dark', 'plain']" @change="modeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">显示内容</view>
        <u-subsection
          :list="['蒹葭苍苍', '白露为霜', '在水一方']"
          @change="textChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">主题选择</view>
        <u-subsection
          current="2"
          :list="['primary', 'success', 'error', 'warning', 'info']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">形状</view>
        <u-subsection
          :list="['square', 'circle', 'circleLeft', 'circleRight']"
          @change="shapeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">尺寸</view>
        <u-subsection :list="['default', 'mini']" @change="sizeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">关闭图标</view>
        <u-subsection :list="['是', '否']" @change="closeableChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsTag",

  setup() {
    let state = reactive({
      text: "蒹葭苍苍",
      mode: "light",
      type: "error",
      size: "default",
      shape: "square",
      closeable: true,
      show: true,
    });

    function modeChange(index) {
      state.mode = index == 0 ? "light" : index == 1 ? "dark" : "plain";
    }

    function textChange(index) {
      state.text = index == 0 ? "蒹葭苍苍" : index == 1 ? "白露为霜" : "在水一方";
    }

    function typeChange(index) {
      state.type =
        index == 0
          ? "primary"
          : index == 1
          ? "success"
          : index == 2
          ? "error"
          : index == 3
          ? "warning"
          : "info";
    }

    function shapeChange(index) {
      state.shape =
        index == 0 ? "square" : index == 1 ? "circle" : index == 2 ? "circleLeft" : "circleRight";
    }

    function sizeChange(index) {
      state.size = index == 0 ? "default" : "mini";
    }

    function closeableChange(index) {
      state.closeable = index == 0 ? true : false;
    }

    function click(index) {
      uni.showToast({ title: `第${index + 1}个标签被点击`, icon: "none" });
    }

    function close(index) {
      uni.showToast({ title: "关闭图标被点击", icon: "none" });
    }

    return {
      ...toRefs(state),
      modeChange,
      textChange,
      typeChange,
      shapeChange,
      sizeChange,
      closeableChange,
      click,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
