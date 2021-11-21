<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-badge-wrap"
          ><u-badge
            :is-center="isCenter"
            :type="type"
            :count="count"
            :is-dot="isDot"
            :offset="offset"
            :size="size"
          ></u-badge
        ></view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">数值显示</view>
        <u-subsection current="1" :list="[0, 8, 15, 106, 209]" @change="countChange"></u-subsection>
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
        <view class="u-item-title">显示点</view>
        <u-subsection current="1" :list="['是', '否']" @change="isDotChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">尺寸</view>
        <u-subsection :list="['default', 'mini']" @change="sizeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">位置偏移</view>
        <u-subsection
          current="1"
          :list="['[20, 20]', '[-8, -8]', '[-20, -20]']"
          @change="offsetChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">中心点与父右上角重合</view>
        <u-subsection current="1" :list="['是', '否']" @change="isCenterChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";

export default defineComponent({
  name: "BadgeIndex",

  setup(props) {
    let state = reactive({
      count: 8,
      type: "error",
      isDot: false,
      offset: [-8, -8],
      size: "default",
      isCenter: false,
    });

    function countChange(index) {
      state.count = index == 0 ? 0 : index == 1 ? 8 : index == 2 ? 15 : index == 3 ? 106 : 209;
    }

    function typeChange(index) {
      console.info("props.typeChange");
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

    function sizeChange(index) {
      state.size = index == 0 ? "default" : "mini";
    }

    function isDotChange(index) {
      state.isDot = index == 0 ? true : false;
    }

    function offsetChange(index) {
      state.offset = index == 0 ? [20, 20] : index == 1 ? [-8, -8] : [-20, -20];
    }

    function isCenterChange(index) {
      state.isCenter = index == 0 ? true : false;
    }

    return {
      ...toRefs(state),
      countChange,
      typeChange,
      sizeChange,
      isDotChange,
      offsetChange,
      isCenterChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.u-badge-wrap {
  position: relative;
  width: 60px;
  height: 60px;
  margin: auto;
  background-color: $u-light-color;
  border-radius: 6px;
}
</style>
