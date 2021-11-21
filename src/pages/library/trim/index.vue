<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here"> 源字符串：{{ `"${string}"` }} </view>
        <view class="u-demo-result-line">
          {{ `"${result}"` }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection
          :list="['左空格', '全部空格', '两边空格', '右空格']"
          @change="modeChange"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { trim } from "@UVIEW/libs/function/trim";

export default defineComponent({
  name: "ComponentsTrim",

  setup() {
    let state = reactive({
      string: "  我用十年  青春，赴你  最后之约  ",
      result: "",
      pos: "left",
    });

    getResult();

    // function paramsChange(index) {
    //   if (index == 0) {
    //     state.min = 0;
    //     state.max = 5;
    //   } else {
    //     state.min = 541;
    //     state.max = 8164;
    //   }
    //   getResult();
    // }

    function modeChange(index) {
      state.pos = index == 0 ? "left" : index == 1 ? "all" : index == 2 ? "both" : "right";
      getResult();
    }

    function getResult() {
      state.result = trim(state.string, state.pos);
    }

    return {
      ...toRefs(state),
      modeChange,
      getResult,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
