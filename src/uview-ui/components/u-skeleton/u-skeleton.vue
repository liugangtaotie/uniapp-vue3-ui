<template>
  <view
    v-if="loading"
    :style="{
      width: windowWinth + 'px',
      height: windowHeight + 'px',
      backgroundColor: bgColor,
      position: 'absolute',
      left: left + 'px',
      top: top + 'px',
      zIndex: 9998,
      overflow: 'hidden',
    }"
    @touchmove.stop.prevent
  >
    <view
      v-for="(item, index) in RectNodes"
      :key="$u.guid()"
      :class="[animation ? 'skeleton-fade' : '']"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        backgroundColor: elColor,
        position: 'absolute',
        left: item.left - left + 'px',
        top: item.top - top + 'px',
      }"
    ></view>
    <view
      v-for="(item, index) in circleNodes"
      :key="$u.guid()"
      :class="animation ? 'skeleton-fade' : ''"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        backgroundColor: elColor,
        borderRadius: item.width / 2 + 'px',
        position: 'absolute',
        left: item.left - left + 'px',
        top: item.top - top + 'px',
      }"
    ></view>
    <view
      v-for="(item, index) in filletNodes"
      :key="$u.guid()"
      :class="animation ? 'skeleton-fade' : ''"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        backgroundColor: elColor,
        borderRadius: borderRadius + 'rpx',
        position: 'absolute',
        left: item.left - left + 'px',
        top: item.top - top + 'px',
      }"
    ></view>
  </view>
</template>

<script lang='ts'>
/**
 * skeleton 骨架屏
 * @description 骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。
 * @tutorial https://www.uviewui.com/components/skeleton.html
 * @property {String} el-color 骨架块状元素的背景颜色（默认#e5e5e5）
 * @property {String} bg-color 骨架组件背景颜色（默认#ffffff）
 * @property {Boolean} animation 骨架块是否显示动画效果（默认false）
 * @property {String Number} border-radius u-skeleton-fillet类名元素，对应的骨架块的圆角大小，单位rpx（默认10）
 * @property {Boolean} loading 是否显示骨架组件，请求完成后，将此值设置为false（默认true）
 * @example <u-skeleton :loading="true" :animation="true"></u-skeleton>
 */
import { defineComponent, reactive, toRefs } from "vue";
let instanceProxy: any;

export default defineComponent({
  name: "u-skeleton",

  props: {
    // 需要渲染的元素背景颜色，十六进制或者rgb等都可以
    elColor: {
      type: String,
      default: "#e5e5e5",
    },
    // 整个骨架屏页面的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    // 是否显示加载动画
    animation: {
      type: Boolean,
      default: false,
    },
    // 圆角值，只对类名为u-skeleton-fillet的元素生效，为数值，不带单位
    borderRadius: {
      type: [String, Number],
      default: "10",
    },
    // 是否显示骨架，true-显示，false-隐藏
    loading: {
      type: Boolean,
      default: true,
    },
  },

  setup(props: any) {
    let state = reactive({
      windowWinth: 750, // 骨架屏宽度
      windowHeight: 1500, // 骨架屏高度
      filletNodes: [], // 圆角元素
      circleNodes: [], // 圆形元素
      RectNodes: [], // 矩形元素
      top: 0,
      left: 0,
    });

    // 查询各节点的信息
    function selecterQueryInfo() {
      // 获取整个父组件容器的高度，当做骨架屏的高度
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      let query: any = "";
      // #ifdef MP-WEIXIN
      query = uni.createSelectorQuery().in(instanceProxy && instanceProxy.$parent);
      // #endif
      // #ifndef MP-WEIXIN
      query = uni.createSelectorQuery();
      // #endif
      query
        .selectAll(".u-skeleton")
        .boundingClientRect()
        .exec((res) => {
          state.windowHeight = res[0][0].height;
          state.windowWinth = res[0][0].width;
          state.top = res[0][0].bottom - res[0][0].height;
          state.left = res[0][0].left;
        });
      // 矩形骨架元素
      getRectEls();
      // 圆形骨架元素
      getCircleEls();
      // 圆角骨架元素
      getFilletEls();
    }

    // 矩形元素列表
    function getRectEls() {
      let query: any = "";
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      // #ifdef MP-WEIXIN
      query = uni.createSelectorQuery().in(instanceProxy && instanceProxy.$parent);
      // #endif
      // #ifndef MP-WEIXIN
      query = uni.createSelectorQuery();
      // #endif
      query
        .selectAll(".u-skeleton-rect")
        .boundingClientRect()
        .exec((res) => {
          state.RectNodes = res[0];
        });
    }

    // 圆角元素列表
    function getFilletEls() {
      let query: any = "";
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      // #ifdef MP-WEIXIN
      query = uni.createSelectorQuery().in(instanceProxy && instanceProxy.$parent);
      // #endif
      // #ifndef MP-WEIXIN
      query = uni.createSelectorQuery();
      // #endif
      query
        .selectAll(".u-skeleton-fillet")
        .boundingClientRect()
        .exec((res) => {
          state.filletNodes = res[0];
        });
    }

    // 圆形元素列表
    function getCircleEls() {
      let query: any = "";
      // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
      // #ifdef MP-WEIXIN
      query = uni.createSelectorQuery().in(instanceProxy && instanceProxy.$parent);
      // #endif
      // #ifndef MP-WEIXIN
      query = uni.createSelectorQuery();
      // #endif
      query
        .selectAll(".u-skeleton-circle")
        .boundingClientRect()
        .exec((res) => {
          state.circleNodes = res[0];
        });
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      selecterQueryInfo,
    };
  },

  mounted() {
    instanceProxy = this;
    // 获取系统信息
    let systemInfo = uni.getSystemInfoSync();
    this.windowHeight = systemInfo.windowHeight;
    this.windowWinth = systemInfo.windowWidth;
    this.selecterQueryInfo();
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.skeleton-fade {
  width: 100%;
  height: 100%;
  background: rgb(194, 207, 214);
  animation-name: blink;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}
</style>
