<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-button
          @click="btnClick"
          data-name="3333"
          :loading="loading"
          :plain="plain"
          :shape="shape"
          :size="size"
          :ripple="ripple"
          :hairLine="hairLine"
          :type="type"
          >山川异域，风月同天</u-button
        >
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">主题选择</view>
        <u-subsection
          :list="['default', 'primary', 'error', 'warning', 'success']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">尺寸大小</view>
        <u-subsection :list="['默认', '中等', '迷你']" @change="sizeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">形状</view>
        <u-subsection :list="['直角', '圆角']" @change="shapeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">镂空</view>
        <u-subsection :current="1" :list="['是', '否']" @change="plainChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">水波纹(感觉哪里有问题？点击顶部的按钮试试)</view>
        <u-subsection :current="1" :list="['是', '否']" @change="rippleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">细边框</view>
        <u-subsection :list="['是', '否']" @change="hairLineChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">加载中</view>
        <u-subsection :current="1" :list="['是', '否']" @change="loadingChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Components-button",

  setup(props: any) {
    let state = reactive({
      hairLine: true,
      type: "default",
      size: "default",
      shape: "square",
      plain: false,
      ripple: false,
      loading: false,
    });

    // 点击type
    function typeChange(e) {
      switch (e) {
        case 0:
          state.type = "default";
          break;
        case 1:
          state.type = "primary";
          break;
        case 2:
          state.type = "error";
          break;
        case 3:
          state.type = "warning";
          break;
        case 4:
          state.type = "success";
          break;
        default:
          break;
      }
    }

    // 点击size
    function sizeChange(e) {
      switch (e) {
        case 0:
          state.size = "default";
          break;
        case 1:
          state.size = "medium";
          break;
        case 2:
          state.size = "mini";
          break;
        default:
          break;
      }
    }

    // 点击shape
    function shapeChange(e) {
      state.shape = e == 0 ? "square" : "circle";
    }

    // 点击plain
    function plainChange(e) {
      state.plain = e == 0 ? true : false;
    }

    // 点击ripple
    function rippleChange(e) {
      state.ripple = e == 0 ? true : false;
    }

    // 点击hairLine
    function hairLineChange(e) {
      state.hairLine = e == 0 ? true : false;
    }

    // 点击loading
    function loadingChange(index) {
      state.loading = index == 0 ? true : false;
    }

    // 点击模态框btn
    function btnClick() {
      uni.showToast({ title: "按钮被点击", icon: "none" });
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      typeChange,
      sizeChange,
      shapeChange,
      plainChange,
      rippleChange,
      hairLineChange,
      loadingChange,
      btnClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.box {
  padding: 30rpx;
}

.box /deep/ button {
  margin-bottom: 40rpx;
}
</style>
