<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here">
          通过压窗屏打开的模态框，可以遮盖顶部原生的导航栏和底部tabbar栏。
          注意：压窗屏只对APP有效，其他端无效。
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="current"
          :list="['打开', '关闭']"
          @change="openModal"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs, nextTick } from "vue";

export default defineComponent({
  name: "ComponentsFullScreen",

  setup() {
    let state = reactive({ current: 1 });

    onMounted(() => {
      nextTick(() => {
        state.current = 1;
      });
    });

    function openModal(index) {
      // 可以传递参数
      if (index == 0) {
        uni.navigateTo({
          url: "/uview-ui/components/u-full-screen/u-full-screen?id=1",
        });
      }
    }

    return {
      ...toRefs(state),
      openModal,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
