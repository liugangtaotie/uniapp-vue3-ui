<template>
  <view class="u-wrap">
    <view class="u-search-box">
      <view class="u-search-inner">
        <u-icon name="search" color="#909399" :size="28"></u-icon>
        <text class="u-search-text">搜索uView</text>
      </view>
    </view>
    <view class="u-menu-wrap">
      <scroll-view
        scroll-y
        scroll-with-animation
        class="u-tab-view menu-scroll-view"
        :scroll-top="scrollTop"
      >
        <view
          v-for="(item, index) in tabbar"
          :key="index"
          class="u-tab-item"
          :class="[current == index ? 'u-tab-item-active' : '']"
          :data-current="index"
          @tap.stop="swichMenu(index)"
        >
          <text class="u-line-1">{{ item.name }}</text>
        </view>
      </scroll-view>
      <block v-for="(item, index) in tabbar" :key="index">
        <scroll-view scroll-y class="right-box" v-if="current == index">
          <view class="page-view">
            <view class="class-item">
              <view class="item-title">
                <text>{{ item.name }}</text>
              </view>
              <view class="item-container">
                <view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
                  <image class="item-menu-image" :src="item1.icon" mode=""></image>
                  <view class="item-menu-name">{{ item1.name }}</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </block>
    </view>
  </view>
</template>

<script lang='ts'>
import classifyData from "@/common/classify.data.js";
import { defineComponent, onMounted, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsMallMenuOne",

  setup() {
    let state = reactive({
      tabbar: classifyData,
      scrollTop: 0, //tab标题的滚动条位置
      current: 0, // 预设当前项的值
      menuHeight: 0, // 左边菜单的高度
      menuItemHeight: 0, // 左边菜单item的高度
    });

    function getImg() {
      return Math.floor(Math.random() * 35);
    }

    // 点击左边的栏目切换
    async function swichMenu(index) {
      if (index == state.current) return;
      state.current = index;
      // 如果为0，意味着尚未初始化
      if (state.menuHeight == 0 || state.menuItemHeight == 0) {
        await getElRect("menu-scroll-view", "menuHeight");
        await getElRect("u-tab-item", "menuItemHeight");
      }
      // 将菜单菜单活动item垂直居中
      state.scrollTop =
        index * state.menuItemHeight + state.menuItemHeight / 2 - state.menuHeight / 2;
    }

    // 获取一个目标元素的高度
    function getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(instanceProxy);
        query
          .select("." + elClass)
          .fields({ size: true }, (res) => {
            // 如果节点尚未生成，res值为null，循环调用执行
            if (!res) {
              setTimeout(() => {
                getElRect(elClass, "");
              }, 10);
              return;
            }
            instanceProxy[dataVal] = res.height;
          })
          .exec();
      });
    }

    return {
      ...toRefs(state),
      getImg,
      getElRect,
      swichMenu,
    };
  },
  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.u-wrap {
  /* #endif */
  display: flex;
  flex-direction: column;
  height: calc(100vh);

  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
}

.u-search-box {
  padding: 18rpx 30rpx;
}

.u-menu-wrap {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.u-search-inner {
  display: flex;
  align-items: center;
  padding: 10rpx 16rpx;
  background-color: rgb(234, 234, 234);
  border-radius: 100rpx;
}

.u-search-text {
  margin-left: 10rpx;
  font-size: 26rpx;
  color: $u-tips-color;
}

.u-tab-view {
  width: 200rpx;
  height: 100%;
}

.u-tab-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110rpx;
  font-size: 26rpx;
  font-weight: 400;
  line-height: 1;
  color: #444;
  background: #f6f6f6;
}

.u-tab-item-active {
  position: relative;
  font-size: 30rpx;
  font-weight: 600;
  color: #000;
  background: #fff;
}

.u-tab-item-active::before {
  position: absolute;
  top: 39rpx;
  left: 0;
  height: 32rpx;
  content: "";
  border-left: 4px solid $u-type-primary;
}

.right-box {
  background-color: rgb(250, 250, 250);
}

.page-view {
  padding: 16rpx;
}

.class-item {
  padding: 16rpx;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

.item-title {
  font-size: 26rpx;
  font-weight: bold;
  color: $u-main-color;
}

.item-menu-name {
  font-size: 24rpx;
  font-weight: normal;
  color: $u-main-color;
}

.item-container {
  display: flex;
  flex-wrap: wrap;
}

.thumb-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.333333%;
  margin-top: 20rpx;
}

.item-menu-image {
  width: 120rpx;
  height: 120rpx;
}
</style>
