<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">源字符串</view>
        <u-subsection :list="['Take me', 'to', 'your heart']" @change="getResult"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import md5Libs from "@UVIEW/libs/function/md5";

export default defineComponent({
  name: "ComponentsMd5",

  setup() {
    let state = reactive({
      result: null as any,
      string: "Take me",
    });

    getResult("");

    function getResult(index) {
      state.string = index == 0 ? "Take me" : index == 1 ? "to" : "you heart";
      state.result = md5Libs.md5(state.string);
    }

    return {
      ...toRefs(state),
      getResult,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
