<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <view class="u-no-demo-here">请点击弹出弹窗查看效果</view>
        <u-modal
          ref="uModal"
          v-model="show"
          :show-cancel-button="true"
          :show-title="showTitle"
          :async-close="asyncClose"
          @confirm="confirm"
          :content="content"
        >
          <!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
          <view class="warp" style="margin: 30rpx" v-if="contentSlot">
            <image
              class="logo"
              src="https://uviewui.com/common/logo.png"
              style="width: 220rpx"
              mode="widthFix"
            ></image>
          </view>
          <!-- #endif -->
        </u-modal>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="current"
          :list="['显示', '隐藏']"
          @change="showChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">是否显示标题</view>
        <u-subsection current="0" :list="['是', '否']" @change="titleChange"></u-subsection>
      </view>
      <!-- #ifndef MP-WEIXIN -->
      <view class="u-config-item">
        <view class="u-item-title">自定义内容</view>
        <u-subsection current="1" :list="['是', '否']" @change="contentChange"></u-subsection>
      </view>
      <!-- #endif -->
      <view class="u-config-item">
        <view class="u-item-title">异步关闭</view>
        <u-subsection current="1" :list="['是', '否']" @change="asyncChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsModal",

  setup(props: any) {
    let state = reactive({
      show: false,
      zoom: false,
      content: "慈母手中线，游子身上衣",
      contentSlot: false,
      showTitle: true,
      asyncClose: false,
    });

    const current = computed(() => {
      return state.show ? 0 : 1;
    });

    function showChange(index) {
      state.show = !index;
    }

    function titleChange(index) {
      state.showTitle = !index;
      state.show = true;
    }

    function contentChange(index) {
      state.contentSlot = !index;
      state.show = true;
    }

    function asyncChange(index) {
      state.show = true;
      state.asyncClose = !index;
    }

    function confirm() {
      setTimeout(() => {
        state.show = false;
      }, 2000);
    }

    return {
      ...toRefs(state),
      current,
      showChange,
      titleChange,
      contentChange,
      asyncChange,
      confirm,
    };
  },
});
</script>

<style scoped lang="scss">
.logo {
  height: auto;
  will-change: transform;
}
</style>
