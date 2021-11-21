<template>
  <u-index-list :scrollTop="scrollTop" :index-list="indexList">
    <view v-for="(item, index) in list" :key="index">
      <u-index-anchor :index="item.letter" />
      <view class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index">
        {{ item1.name }}
      </view>
    </view>
  </u-index-list>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import indexList from "@/common/index.list.js";

const letterArr = indexList.list.map((val) => {
  return val.letter;
});

export default defineComponent({
  name: "ComponentsIndexList",

  setup() {
    let state = reactive({
      scrollTop: 0,
      indexList: letterArr,
      list: indexList.list,
    });

    return {
      ...toRefs(state),
    };
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
});
</script>

<style lang="scss" scoped>
.list-cell {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  font-size: 14px;
  line-height: 24px;
  color: $u-content-color;
  background-color: #fff;
}
</style>
