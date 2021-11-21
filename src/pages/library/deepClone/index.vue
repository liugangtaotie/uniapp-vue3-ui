<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here"> 源对象为："{info: {name: 'mary'}}" </view>
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { deepClone } from "@UVIEW/libs/function/deepClone";

export default defineComponent({
  name: "ComponentsDeepclone",

  setup(props: any) {
    let state = reactive({
      obj: {
        info: {
          name: "mary",
        },
      },
      result: "",
    });

    state.result = deepClone(state.obj);

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
