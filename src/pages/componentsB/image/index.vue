<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area u-flex u-row-center">
        <u-image
          :shape="shape"
          ref="uImage"
          :width="width"
          :height="height"
          :src="src"
          mode="aspectFill"
        >
          <u-loading size="44" mode="flower" slot="loading" v-if="loadingSlot"></u-loading>
          <view v-if="errorSlot" slot="error" style="font-size: 24rpx">加载失败</view>
        </u-image>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="statusCurrent"
          :list="['加载成功', '加载中', '加载失败']"
          @change="statusChange"
        ></u-subsection>
      </view>
      <!-- 微信小程序中，无法动态切换slot，所以隐藏此部分的演示 -->
      <!-- #ifndef MP-WEIXIN -->
      <view class="u-config-item">
        <view class="u-item-title">加载中状态</view>
        <u-subsection :list="['默认', '自定义']" @change="loadingChange"></u-subsection>
      </view>
      <!-- #endif -->
      <view class="u-config-item">
        <view class="u-item-title">加载失败状态</view>
        <u-subsection :list="['默认', '自定义']" @change="errorChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">形状</view>
        <u-subsection :list="['方形', '圆形']" @change="shapeChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "Components-image",

  setup() {
    let state = reactive({
      src: "https://jkt.bsoft.com.cn/hcn-web/mini_images/images/bsoft.png",
      width: "200",
      height: "200",
      loadingSlot: false,
      statusCurrent: 0,
      errorSlot: false,
      shape: "square",
    });

    // 点击statue
    function statusChange(index) {
      // 此处通过ref操作组件内部状态，仅是为了演示使用，实际中无需这些操作，由内部的图片加载事件自动完成
      if (index == 0) {
        state.src = "http://img5.imgtn.bdimg.com/it/u=2438062088,2808868405&fm=26&gp=0.jpg";
        instanceProxy.$refs.uImage.loading = false;
        instanceProxy.$refs.uImage.isError = false;
      } else if (index == 1) {
        instanceProxy.$refs.uImage.loading = true;
      } else {
        instanceProxy.$refs.uImage.loading = false;
        instanceProxy.$refs.uImage.isError = true;
      }
    }

    // 点击loading
    function loadingChange(index) {
      state.statusCurrent = 1;
      statusChange(1);
      if (index == 0) {
        state.loadingSlot = false;
      } else {
        state.loadingSlot = true;
      }
    }

    // 点击error
    function errorChange(index) {
      state.statusCurrent = 2;
      statusChange(2);
      if (index == 0) {
        state.errorSlot = false;
      } else {
        state.errorSlot = true;
      }
    }

    // 点击shape
    function shapeChange(index) {
      state.shape = index == 0 ? "square" : "circle";
    }

    return {
      ...toRefs(state),
      statusChange,
      loadingChange,
      errorChange,
      shapeChange,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style scoped lang="scss">
</style>
