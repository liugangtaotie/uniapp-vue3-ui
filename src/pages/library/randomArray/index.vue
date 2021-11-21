<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here"> 源数组为：[1, 2, 3, 4, 5] </view>
        <view class="u-demo-result-line">
          {{ `[${result.join(", ")}]` }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">操作</view>
        <u-button @click="getResult">执行</u-button>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { randomArray } from "@UVIEW/libs/function/randomArray";

export default defineComponent({
  name: "ComponentsRandomArray",

  setup() {
    let state = reactive({
      orginArray: [1, 2, 3, 4, 5],
      result: [] as any,
    });

    getResult();

    function getResult() {
      state.result = randomArray(state.orginArray);
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
