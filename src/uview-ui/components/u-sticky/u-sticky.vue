<template>
  <view class="">
    <view
      class="u-sticky-wrap"
      :class="[elClass]"
      :style="{
        height: fixed ? height + 'px' : 'auto',
        backgroundColor: bgColor,
      }"
    >
      <view
        class="u-sticky"
        :style="{
          position: fixed ? 'fixed' : 'static',
          top: stickyTop + 'px',
          left: left + 'px',
          width: width == 'auto' ? 'auto' : width + 'px',
          zIndex: uZIndex,
        }"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
/**
 * sticky 吸顶
 * @description 该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时， 就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。
 * @tutorial https://www.uviewui.com/components/sticky.html
 * @property {String Number} offset-top 吸顶时与顶部的距离，单位rpx（默认0）
 * @property {String Number} index 自定义标识，用于区分是哪一个组件
 * @property {Boolean} enable 是否开启吸顶功能（默认true）
 * @property {String} bg-color 组件背景颜色（默认#ffffff）
 * @property {String Number} z-index 吸顶时的z-index值（默认970）
 * @property {String Number} h5-nav-height 导航栏高度，自定义导航栏时(无导航栏时需设置为0)，需要传入此值，单位px（默认44）
 * @event {Function} fixed 组件吸顶时触发
 * @event {Function} unfixed 组件取消吸顶时触发
 * @example <u-sticky offset-top="200"><view>塞下秋来风景异，衡阳雁去无留意</view></u-sticky>
 */
import { defineComponent, computed, reactive, toRefs, watch, nextTick } from "vue";
import { guid } from "../../libs/function/guid";
import { zIndex } from "../../libs/config/zIndex";
let instanceProxy: any;

export default defineComponent({
  name: "u-sticky",

  props: {
    // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
    offsetTop: {
      type: [Number, String],
      default: 0,
    },
    //列表中的索引值
    index: {
      type: [Number, String],
      default: "",
    },
    // 是否开启吸顶功能
    enable: {
      type: Boolean,
      default: true,
    },
    // h5顶部导航栏的高度
    h5NavHeight: {
      type: [Number, String],
      default: 44,
    },
    // 吸顶区域的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    // z-index值
    zIndex: {
      type: [Number, String],
      default: "",
    },
  },

  emits: ["fixed", "unfixed"],

  setup(props: any, { emit }) {
    let state = reactive({
      fixed: false,
      height: "auto",
      stickyTop: 0,
      elClass: guid(),
      left: 0,
      width: "auto",
    });

    watch(
      () => props.offsetTop,
      (newVal, oldVal) => {
        initObserver();
      }
    );

    watch(
      () => props.enable,
      (newVal, oldVal) => {
        if (newVal == false) {
          state.fixed = false;
          disconnectObserver("contentObserver");
        } else {
          initObserver();
        }
      }
    );

    const uZIndex = computed(() => {
      return props.zIndex ? props.zIndex : zIndex.sticky;
    });

    function initObserver() {
      if (!props.enable) return;
      // #ifdef H5
      state.stickyTop =
        props.offsetTop != 0 ? uni.upx2px(props.offsetTop) + props.h5NavHeight : props.h5NavHeight;
      // #endif
      // #ifndef H5
      state.stickyTop = props.offsetTop != 0 ? uni.upx2px(props.offsetTop) : 0;
      // #endif

      disconnectObserver("contentObserver");
      instanceProxy &&
        instanceProxy.$uGetRect("." + state.elClass).then((res) => {
          state.height = res.height;
          state.left = res.left;
          state.width = res.width;
          nextTick(() => {
            observeContent();
          });
        });
    }

    function observeContent() {
      disconnectObserver("contentObserver");
      const contentObserver =
        instanceProxy &&
        instanceProxy.createIntersectionObserver({
          thresholds: [0.95, 0.98, 1],
        });
      contentObserver.relativeToViewport({
        top: -state.stickyTop,
      });
      contentObserver.observe("." + state.elClass, (res) => {
        if (!props.enable) return;
        setFixed(res.boundingClientRect.top);
      });
      instanceProxy.contentObserver = contentObserver;
    }

    function setFixed(top) {
      const fixed = top < state.stickyTop;
      if (fixed) emit("fixed", props.index);
      else if (state.fixed) emit("unfixed", props.index);
      state.fixed = fixed;
    }

    function disconnectObserver(observerName) {
      const observer = instanceProxy[observerName];
      observer && observer.disconnect();
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      uZIndex,
      initObserver,
      disconnectObserver,
    };
  },

  mounted() {
    instanceProxy = this;
    this.initObserver();
  },

  beforeUnmount() {
    this.disconnectObserver("contentObserver");
  },
});
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-sticky {
  z-index: 9999999999;
}
</style>
