<template>
  <view class="wrap">
    <page-nav :desc="desc" title="nav.components"></page-nav>
    <view class="list-wrap">
      <u-cell-group
        title-bg-color="rgb(243, 244, 246)"
        :title="item.groupName"
        v-for="(item, index) in list"
        :key="index"
      >

        <!-- #ifdef MP-ALIPAY -->
        <u-cell-item
          :titleStyle="{ 'font-weight': 500 }"
          @click="openPage(item1.path)"
          :title="item1.title"
          v-for="(item1, index1) in item.list"
          :key="index1"
          :arrow="true"
        >
        <!-- #endif -->
        <!-- #ifndef MP-ALIPAY -->
        <u-cell-item
          :titleStyle="{ 'font-weight': 500 }"
          @click.native="openPage(item1.path)"
          :title="item1.title"
          v-for="(item1, index1) in item.list"
          :key="index1"
          :arrow="true"
        >
        <!-- #endif -->
        
          <image slot="icon" class="u-cell-icon" :src="getIcon(item1.icon)" mode="widthFix"></image>
        </u-cell-item>
      </u-cell-group>
    </view>
    <u-gap height="70"></u-gap>
    <!-- <u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar> -->
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import list from "./components.config.js";

let instanceProxy: any;

export default defineComponent({
  name: "Components",

  onShow() {
    uni.setNavigationBarTitle({
      title: "组件",
    });
  },

  setup() {
    const desc = "众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让你快速集成，开箱即用。";

    const indexStyle = {
      width: "100rpx",
      height: "100rpx",
    };

    const secondStyle = {
      color: "red",
    };

    let state = reactive({
      list: list,
    });

    const getIcon = computed(() => {
      return (path) => {
        return "https://cdn.uviewui.com/uview/example/" + path + ".png";
      };
    });

    function openPage(path) {
      instanceProxy.$u.route({
        url: path,
      });
    }

    return {
      ...toRefs(state),
      desc,
      indexStyle,
      secondStyle,
      getIcon,
      openPage,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>


<style>
/* page {
		background-color: rgb(240, 242, 244);
	} */
</style>

<style lang="scss" scoped>
.u-cell-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}
</style>
