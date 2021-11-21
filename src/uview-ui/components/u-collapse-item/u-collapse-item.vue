<template>
  <view class="u-collapse-item" :style="itemStyle">
    <view
      :hover-stay-time="200"
      class="u-collapse-head"
      @tap.stop="headClick"
      :hover-class="hoverClass"
      :style="headStyle"
    >
      <block v-if="!$slots['title-all']">
        <view v-if="!$slots['title']" class="u-collapse-title u-line-1" :style="titleStyle">
          {{ title }}
        </view>
        <slot v-else name="title" />
        <view class="u-icon-wrap">
          <u-icon
            v-if="arrow"
            :color="arrowColor"
            :class="{ 'u-arrow-down-icon-active': isShow }"
            class="u-arrow-down-icon"
            name="arrow-down"
          ></u-icon>
        </view>
      </block>
      <slot v-else name="title-all" />
    </view>
    <view class="u-collapse-body" :style="bodyParentStyle">
      <view class="u-collapse-content" :id="elId" :style="bodyStyle">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
/**
 * collapseItem 手风琴Item
 * @description 通过折叠面板收纳内容区域（搭配u-collapse使用）
 * @tutorial https://www.uviewui.com/components/collapse.html
 * @property {String} title 面板标题
 * @property {String Number} index 主要用于事件的回调，标识那个Item被点击
 * @property {Boolean} disabled 面板是否可以打开或收起（默认false）
 * @property {Boolean} open 设置某个面板的初始状态是否打开（默认false）
 * @property {String Number} name 唯一标识符，如不设置，默认用当前collapse-item的索引值
 * @property {String} align 标题的对齐方式（默认left）
 * @property {Object} active-style 不显示箭头时，可以添加当前选择的collapse-item活动样式，对象形式
 * @event {Function} change 某个item被打开或者收起时触发
 * @example <u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</u-collapse-item>
 */
import { defineComponent, onMounted, computed, reactive, toRefs, watch, nextTick } from "vue";
import { guid } from "../../libs/function/guid";
import mixin from "../../libs/mixin/mixin";
import { styleObjToString } from "../../libs/function/styleObjToString";

let instanceProxy: any;

export default defineComponent({
  name: "u-collapse-item",

  mixins: [mixin],

  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 标题的对齐方式
    align: {
      type: String,
      default: "left",
    },
    // 是否可以点击收起
    disabled: {
      type: Boolean,
      default: false,
    },
    // collapse显示与否
    open: {
      type: Boolean,
      default: false,
    },
    // 唯一标识符
    name: {
      type: [Number, String],
      default: "",
    },
    // 活动样式
    activeStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    // 标识当前为第几个
    index: {
      type: [String, Number],
      default: "",
    },
  },

  emits: ["change"],

  setup(props: any, { emit }) {
    let state = reactive({
      currentParent: "" as any,
      isShow: false as any,
      elId: guid(),
      height: 0, // body内容的高度
      headStyle: {}, // 头部样式，对象形式
      bodyStyle: {}, // 主体部分样式
      itemStyle: {}, // 每个item的整体样式
      arrowColor: "", // 箭头的颜色
      hoverClass: "", // 头部按下时的效果样式类
      arrow: true, // 是否显示右侧箭头
      bodyParentStyle: "",
    });

    state.currentParent = false;
    // 获取u-collapse的信息，放在u-collapse是为了方便，不用每个u-collapse-item写一遍
    state.isShow = props.open;

    watch(
      () => props.open,
      (newVal, oldVal) => {
        state.isShow = newVal;
      }
    );

    // watch(
    //   () => state.isShow,
    //   (newVal, oldVal) => {
    //     state.bodyParentStyle = styleObjToString({
    //       height: state.isShow ? state.height + "px" : "0",
    //     });
    //   }
    // );

    const titleStyle = computed(() => {
      const styleObj = Object.assign(
        { "text-align": props.align ? props.align : "left" },
        state.isShow && props.activeStyle && !state.arrow ? props.activeStyle : ""
      );
      return styleObjToString(styleObj);
    });

    const bodyParentStyle = computed(() => {
      const styleObj = { height: state.isShow ? state.height + "px" : "0" };
      return styleObjToString(styleObj);
    });

    onMounted(() => {
      init();
    });

    // 异步获取内容，或者动态修改了内容时，需要重新初始化
    function init() {
      state.currentParent =
        instanceProxy &&
        instanceProxy.$u &&
        instanceProxy.$u.$parent &&
        instanceProxy.$u.$parent.$parent.call(instanceProxy, "u-collapse");

      if (state.currentParent) {
        // props.nameSync = props.name ? props.name : state.currentParent.childrens.length;
        state.currentParent.childrens.push(instanceProxy);
        state.headStyle = styleObjToString(state.currentParent.headStyle);
        state.bodyStyle = styleObjToString(state.currentParent.bodyStyle);
        state.arrowColor = state.currentParent.arrowColor;
        state.hoverClass = state.currentParent.hoverClass;
        state.arrow = state.currentParent.arrow;
        state.itemStyle = styleObjToString(state.currentParent.itemStyle);
      }
      nextTick(() => {
        queryRect();
      });
    }

    // 点击collapsehead头部
    function headClick() {
      if (props.disabled) return;
      if (state.currentParent && state.currentParent.accordion == true) {
        state.currentParent.childrens.map((val) => {
          // 自身不设置为false，因为后面有this.isShow = !this.isShow;处理了
          if (instanceProxy != val) {
            val.isShow = false;
          }
        });
      }

      state.isShow = !state.isShow;
      // 触发本组件的事件
      emit("change", {
        index: props.index,
        show: state.isShow,
      });
      console.info("111111333", state.isShow);
      // 只有在打开时才发出事件
      if (state.isShow) state.currentParent && state.currentParent.onChange();
      console.info("state.currentParent", state.currentParent);
      // instanceProxy.$forceUpdate();
    }

    // 查询内容高度
    function queryRect() {
      // $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
      // 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
      instanceProxy &&
        instanceProxy.$uGetRect("#" + state.elId).then((res) => {
          state.height = res.height;
        });
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      headClick,
      titleStyle,
      bodyParentStyle,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-collapse-head {
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  font-size: 30rpx;
  line-height: 1;
  color: $u-main-color;
  text-align: left;
  @include vue-flex;
}

.u-collapse-title {
  flex: 1;
  overflow: hidden;
}

.u-arrow-down-icon {
  margin-right: 20rpx;
  margin-left: 14rpx;
  transition: all 0.3s;
}

.u-arrow-down-icon-active {
  transform: rotate(180deg);
  transform-origin: center center;
}

.u-collapse-body {
  overflow: hidden;
  transition: all 0.3s;
}

.u-collapse-content {
  overflow: hidden;
  font-size: 28rpx;
  color: $u-tips-color;
  text-align: left;
}
</style>
