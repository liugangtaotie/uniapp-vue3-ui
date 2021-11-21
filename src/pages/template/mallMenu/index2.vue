<template>
  <view class="u-wrap">
    <view class="u-search-box">
      <view class="u-search-inner">
        <u-icon name="search" color="#909399" :size="28"></u-icon>
        <text class="u-search-text">搜索</text>
      </view>
    </view>
    <view class="u-menu-wrap">
      <scroll-view
        scroll-y
        scroll-with-animation
        class="u-tab-view menu-scroll-view"
        :scroll-top="scrollTop"
        :scroll-into-view="itemId"
      >
        <view
          v-for="(item, index) in tabbar"
          :key="index"
          class="u-tab-item"
          :class="[current == index ? 'u-tab-item-active' : '']"
          @tap.stop="swichMenu(index)"
        >
          <text class="u-line-1">{{ item.name }}</text>
        </view>
      </scroll-view>
      <scroll-view
        :scroll-top="scrollRightTop"
        scroll-y
        scroll-with-animation
        class="right-box"
        @scroll="rightScroll"
      >
        <view class="page-view">
          <view
            class="class-item"
            :id="'item' + index"
            v-for="(item, index) in tabbar"
            :key="index"
          >
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
    </view>
  </view>
</template>

<script lang='ts'>
import classifyData from "@/common/classify.data.js";
import { defineComponent, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsMallMenu",

  setup() {
    let state = reactive({
      scrollTop: 0, //tab标题的滚动条位置
      oldScrollTop: 0,
      current: 0, // 预设当前项的值
      menuHeight: 0, // 左边菜单的高度
      menuItemHeight: 0, // 左边菜单item的高度
      itemId: "", // 栏目右边scroll-view用于滚动的id
      tabbar: classifyData,
      menuItemPos: [],
      arr: [] as any,
      scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
      timer: null, // 定时器
    });

    // 点击左边的栏目切换
    async function swichMenu(index) {
      if (state.arr.length == 0) {
        await getMenuItemTop();
      }
      if (index == state.current) return;
      state.scrollRightTop = state.oldScrollTop;
      instanceProxy.$nextTick(function () {
        state.scrollRightTop = state.arr[index];
        state.current = index;
        leftMenuStatus(index);
      });
    }

    // 获取一个目标元素的高度
    function getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(instanceProxy);
        query
          .select("." + elClass)
          .fields(
            {
              size: true,
            },
            (res) => {
              // 如果节点尚未生成，res值为null，循环调用执行
              if (!res) {
                setTimeout(() => {
                  getElRect(elClass, "");
                }, 10);
                return;
              }
              instanceProxy[dataVal] = res.height;
              resolve("");
            }
          )
          .exec();
      });
    }

    // 观测元素相交状态
    async function observer() {
      state.tabbar.map((val, index) => {
        let observer = (uni as any).createIntersectionObserver(instanceProxy);
        // 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
        // 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
        observer
          .relativeTo(".right-box", {
            top: 0,
          })
          .observe("#item" + index, (res) => {
            if (res.intersectionRatio > 0) {
              let id = res.id.substring(4);
              leftMenuStatus(id);
            }
          });
      });
    }

    // 设置左边菜单的滚动状态
    async function leftMenuStatus(index) {
      state.current = index;
      // 如果为0，意味着尚未初始化
      if (state.menuHeight == 0 || state.menuItemHeight == 0) {
        await getElRect("menu-scroll-view", "menuHeight");
        await getElRect("u-tab-item", "menuItemHeight");
      }
      // 将菜单活动item垂直居中
      state.scrollTop =
        index * state.menuItemHeight + state.menuItemHeight / 2 - state.menuHeight / 2;
    }

    // 获取右边菜单每个item到顶部的距离
    function getMenuItemTop() {
      new Promise((resolve) => {
        let selectorQuery = uni.createSelectorQuery();
        selectorQuery
          .selectAll(".class-item")
          .boundingClientRect((rects: any) => {
            // 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
            if (!rects.length) {
              setTimeout(() => {
                getMenuItemTop();
              }, 10);
              return;
            }
            rects.forEach((rect: any) => {
              // 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
              state.arr.push(rect.top - rects[0].top);
              resolve("");
            });
          })
          .exec();
      });
    }

    // 右边菜单滚动
    async function rightScroll(e) {
      state.oldScrollTop = e.detail.scrollTop;
      if (state.arr.length == 0) {
        await getMenuItemTop();
      }
      if (state.timer) return;
      if (!state.menuHeight) {
        await getElRect("menu-scroll-view", "menuHeight");
      }
      setTimeout(() => {
        // 节流
        state.timer = null;
        // scrollHeight为右边菜单垂直中点位置
        let scrollHeight = e.detail.scrollTop + state.menuHeight / 2;
        for (let i = 0; i < state.arr.length; i++) {
          let height1 = state.arr[i];
          let height2 = state.arr[i + 1];
          // 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
          if (!height2 || (scrollHeight >= height1 && scrollHeight < height2)) {
            leftMenuStatus(i);
            return;
          }
        }
      }, 10);
    }

    return {
      ...toRefs(state),
      swichMenu,
      getElRect,
      observer,
      leftMenuStatus,
      getMenuItemTop,
      rightScroll,
    };
  },

  onReady() {
    instanceProxy.getMenuItemTop();
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

.class-item:last-child {
  min-height: 100vh;
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
