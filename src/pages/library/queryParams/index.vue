<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here">源对象：{{ JSON.stringify(params) }}</view>
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">是否带问号</view>
        <u-subsection :list="['是', '否']" @change="prefixChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { queryParams } from "@UVIEW/libs/function/queryParams";

export default defineComponent({
  name: "ComponentsQueryParams",

  setup() {
    let state = reactive({
      prefix: true,
      params: {
        name: "典韦",
        age: 32,
      },
      result: "",
    });

    getResult();

    function prefixChange(index) {
      state.prefix = index == 0 ? true : false;
      getResult();
    }

    async function getResult() {
      state.result = queryParams(state.params, state.prefix);
    }

    return {
      ...toRefs(state),
      prefixChange,
      getResult,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
