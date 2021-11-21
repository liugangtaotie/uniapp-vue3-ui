<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-button @click="openPage">点击跳转</u-button>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">类型</view>
        <u-subsection
          :list="['navigateTo', 'switchTab', 'navigateBack']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">携带参数(针对type=navigateTo)</view>
        <u-subsection :list="['是', '否']" @change="paramsChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">窗口动画(App且type=navigateTo||navigateBack时有效)</view>
        <u-subsection :list="['是', '否']" @change="animateChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from "vue";
let instanceProxy: any;

export default defineComponent({
  name: "ComponentsRoute",

  setup() {
    let state = reactive({
      type: "to",
      params: {
        age: 22,
        name: "李商隐",
      } as any,
      animate: "slide-in-bottom",
      url: "",
    });

    const jumpUrl = computed(() => {
      let url = "";
      if (state.type == "to") {
        url = "/pages/library/route/routeTo";
      } else if (state.type == "tab") {
        url = "/pages/example/template";
      }
      return url;
    });

    function openPage() {
      instanceProxy.$u.route({
        type: state.type,
        params: state.params,
        url: jumpUrl,
        animationType: state.animate,
      });
    }

    function typeChange(index) {
      state.type = index == 0 ? "to" : index == 1 ? "tab" : "back";
    }

    function paramsChange(index) {
      if (!index) {
        state.params = {
          age: 22,
          name: "李商隐",
        };
      } else {
        state.params = {};
      }
    }

    function animateChange(index) {
      state.animate = index == 0 ? "slide-in-bottom" : "";
    }

    return {
      ...toRefs(state),
      jumpUrl,
      openPage,
      typeChange,
      paramsChange,
      animateChange,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  padding: 24rpx;
}
</style>
