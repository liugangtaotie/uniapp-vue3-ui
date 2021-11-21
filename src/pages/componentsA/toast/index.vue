<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast :type="type" ref="uToast"></u-toast>
        <text class="no-mode-here">见弹出toast</text>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">主题</view>
        <u-subsection
          :current="4"
          :list="['primary', 'success', 'error', 'warning', 'default']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">结束后自动跳转</view>
        <u-subsection current="1" :list="['是', '否']" @change="urlChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">位置</view>
        <u-subsection
          current="1"
          :list="['顶部', '中部', '底部']"
          @change="positionChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">显示图标</view>
        <u-subsection :list="['是', '否']" @change="iconChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsToast",

  setup() {
    let state = reactive({
      type: "success",
      title: "桃花潭水深千尺",
      icon: true,
      position: "center",
      url: "",
    });

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
          : "default";
      show();
    }

    function positionChange(index) {
      state.position = index == 0 ? "top" : index == 1 ? "center" : "bottom";
      show();
    }

    function iconChange(index) {
      state.icon = index == 0 ? true : false;
      show();
    }

    function urlChange(index) {
      state.url = index == 0 ? "/pages/components/button/index" : "";
      show();
    }

    function show() {
      instanceProxy.$refs.uToast.show({
        title: state.title,
        position: state.position,
        type: state.type,
        icon: state.icon,
        url: state.url,
      });
    }

    function hide() {
      instanceProxy.$refs.uToast.hide();
    }

    return {
      ...toRefs(state),
      typeChange,
      positionChange,
      iconChange,
      urlChange,
      show,
      hide,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.no-mode-here {
  font-size: 28rpx;
  color: $u-tips-color;
}
</style>
