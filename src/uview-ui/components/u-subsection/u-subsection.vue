<template>
  <view class="u-subsection" :style="subsectionStyle">
    <view
      id="subsectionId"
      class="u-item u-line-1"
      :style="item.itemStyle"
      @tap="onClickItem(index)"
      :class="[noBorderRight(index), 'u-item-' + index]"
      v-for="(item, index) in state.listInfo"
      :key="index"
    >
      <view :style="item.textStyle" class="u-item-text u-line-1">{{ item.name }}</view>
    </view>
    <view class="u-item-bg" :style="itemBarStyle"></view>
  </view>
</template>

<script lang="ts">
/**
 * subsection 分段器
 * @description 该分段器一般用于用户从几个选项中选择某一个的场景
 * @tutorial https://www.uviewui.com/components/subsection.html
 * @propserty {Array} list 选项的数组，形式见上方"基本使用"
 * @propserty {String Number} current 初始化时默认选中的选项索引值（默认0）
 * @propserty {String} active-color 激活时的颜色，mode为subsection时固定为白色（默认#303133）
 * @propserty {String} inactive-color 未激活时字体的颜色，mode为subsection时无效（默认#606266）
 * @propserty {String} mode 模式选择，见官网"模式选择"说明（默认button）
 * @propserty {String Number} font-size 字体大小，单位rpx（默认28）
 * @propserty {String Number} height 组件高度，单位rpx（默认70）
 * @propserty {Boolean} animation 是否开启动画效果，见上方说明（默认true）
 * @propserty {Boolean} bold 激活选项的字体是否加粗（默认true）
 * @propserty {String} bg-color 组件背景颜色，mode为button时有效（默认#eeeeef）
 * @propserty {String} button-color 按钮背景颜色，mode为button时有效（默认#ffffff）
 * @event {Function} change 分段器选项发生改变时触发
 * @example <u-subsection active-color="#ff9900"></u-subsection>
 */
import { defineComponent, onMounted, onUpdated, watch, computed, reactive } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";

let instance: any;
let instanceProxy: any;

export default defineComponent({
  name: "u-subsection",

  props: {
    // tab的数据
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 当前活动的tab的index
    current: {
      type: [Number, String],
      default: 0,
    },
    // 激活的颜色
    activeColor: {
      type: String,
      default: "#303133",
    },
    // 未激活的颜色
    inactiveColor: {
      type: String,
      default: "#606266",
    },
    // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
    mode: {
      type: String,
      default: "button",
    },
    // 字体大小，单位rpx
    fontSize: {
      type: [Number, String],
      default: 28,
    },
    // 是否开启动画效果
    animation: {
      type: Boolean,
      default: true,
    },
    // 组件的高度，单位rpx
    height: {
      type: [Number, String],
      default: 70,
    },
    // 激活tab的字体是否加粗
    bold: {
      type: Boolean,
      default: true,
    },
    // mode=button时，组件背景颜色
    bgColor: {
      type: String,
      default: "#eeeeef",
    },
    // mode = button时，滑块背景颜色
    buttonColor: {
      type: String,
      default: "#ffffff",
    },
    // 在切换分段器的时候，是否让设备震一下
    vibrateShort: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["change"],

  setup(props: any, { emit }) {
    let state = reactive({
      listInfo: [] as any,
      itemBgStyle: {
        width: 0,
        left: 0,
        "background-color": "#ffffff",
        height: "100%",
        transition: "",
      } as any,
      currentIndex: props.current,
      buttonPadding: 3, // mode = button 时，组件的内边距
      borderRadius: 5, // 圆角值
      firstTimeVibrateShort: true, // 组件初始化时，会触发current变化，此时不应震动
    });

    // 将list的数据，传入listInfo数组，因为不能修改props传递的list值
    // 可以接受直接数组形式，或者数组元素为对象的形式，如：['简介', '评论'],或者[{name: '简介'}, {name: '评论'}]
    consumItemStyle();

    onMounted(() => {
      setTimeout(() => {
        getTabsInfo();
      }, 10);
    });

    watch(
      () => state.currentIndex,
      (newVal, oldVal) => {
        state.currentIndex = newVal;
        changeSectionStatus(newVal);
      }
    );

    // 设置mode=subsection时，滑块特有的样式
    const noBorderRight = computed(() => {
      return (index) => {
        if (props.mode != "subsection") return;
        let classs = "";
        // 不显示右边的边框
        if (index < props.list.length - 1) classs += " u-none-border-right";
        // 显示整个组件的左右边圆角
        if (index == 0) classs += " u-item-first";
        if (index == props.list.length - 1) classs += " u-item-last";
        return styleObjToString(classs);
      };
    });

    // 每个分段器item的样式
    function itemStyleFun() {
      let style: any = {};
      if (props.mode == "subsection") {
        // 设置border的样式
        style["border-color"] = props.activeColor;
        style["border-width"] = "1px";
        style["border-style"] = "solid";
      }
      return styleObjToString(style);
    }

    // mode=button时，外层view的样式
    const subsectionStyle = computed(() => {
      let style: any = {};
      style.height = uni.upx2px(props.height) + "px";
      if (props.mode == "button") {
        style["background-color"] = props.bgColor;
        style.padding = `${state.buttonPadding}px`;
        style["border-radius"] = `${state.borderRadius}px`;
      }
      return styleObjToString(style);
    });

    // 滑块的样式
    const itemBarStyle = computed(() => {
      let style: any = {};
      style["background-color"] = props.activeColor;
      style["z-index"] = 1;
      if (props.mode == "button") {
        style["background-color"] = props.buttonColor;
        style["border-radius"] = `${state.borderRadius}px`;
        style.bottom = `${state.buttonPadding}px`;
        style.height = uni.upx2px(props.height) - state.buttonPadding * 2 + "px";
        style["z-index"] = 0;
      }
      const styleObj = Object.assign(state.itemBgStyle, style);
      return styleObjToString(styleObj);
    });

    // 改变滑块的样式
    function changeSectionStatus(nVal) {
      if (props.mode == "subsection") {
        // 根据滑块在最左边和最右边时，显示左边和右边的圆角
        if (nVal == props.list.length - 1) {
          state.itemBgStyle[
            "border-radius"
          ] = `0 ${state.buttonPadding}px ${state.buttonPadding}px 0`;
        }
        if (nVal == 0) {
          state.itemBgStyle[
            "border-radius"
          ] = `${state.buttonPadding}px 0 0 ${state.buttonPadding}px`;
        }
        if (nVal > 0 && nVal < props.list.length - 1) {
          state.itemBgStyle["border-radius"] = "0";
        }
      }

      // 更新滑块的位置
      setTimeout(() => {
        itemBgLeft();
      }, 10);

      if (props.vibrateShort && !state.firstTimeVibrateShort) {
        // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
        // #ifndef H5
        (uni as any).vibrateShort();
        // #endif
      }
      // 第一次过后，设置firstTimeVibrateShort为false，让其下一次可以震动(如果允许震动的话)
      state.firstTimeVibrateShort = false;
    }

    // 点击计算item属性
    function consumItemStyle() {
      state.listInfo = props.list.map((val, index) => {
        if (typeof val != "object") {
          let obj = {
            width: 0,
            name: val,
            itemStyle: itemStyleFun(),
            textStyle: textStyleFun(index),
          };
          return obj;
        } else {
          val.width = 0;
          return val;
        }
      });
    }

    // 文字的样式
    function textStyleFun(index) {
      let style: any = {};
      // 设置字体颜色
      if (props.mode == "subsection") {
        if (index == state.currentIndex) {
          style.color = "#ffffff";
        } else {
          style.color = props.activeColor;
        }
      } else {
        if (index == state.currentIndex) {
          style.color = props.activeColor;
        } else {
          style.color = props.inactiveColor;
        }
      }
      // 字体加粗
      if (index == state.currentIndex && props.bold) style["font-weight"] = "bold";
      // 文字大小
      style["font-size"] = props.fontSize + "rpx";
      return styleObjToString(style);
    }

    // 点击item
    function onClickItem(index) {
      // 不允许点击当前激活选项
      if (index == state.currentIndex) return;
      state.currentIndex = index;
      changeSectionStatus(index);
      emit("change", Number(index));
    }

    // 获取各个tab的节点信息
    function getTabsInfo() {
      // let NodesRef = uni.createSelectorQuery().in(instanceProxy).select("#subsectionId") as any;

      // // console.info("instanceProxy", instanceProxy);
      // console.info("获取各个tab的节点信息view", NodesRef);
      // // console.info("获取各个tab的节点信息viewstate.listInfo", state.listInfo);

      // NodesRef.boundingClientRect((data) => {
      //   console.log("得到布局位置信息" + JSON.stringify(data));

      // }).exec();
      let view = uni.createSelectorQuery().in(instanceProxy);

      // console.info("instanceProxy", instanceProxy);
      // console.info("获取各个tab的节点信息view", view);
      // console.info("获取各个tab的节点信息viewstate.listInfo", state.listInfo);

      for (let i = 0; i < state.listInfo.length; i++) {
        (view.select(".u-item-" + i) as any).boundingClientRect();
      }
      // console.info("view.exec", view.exec);
      view.exec((res) => {
        if (!res.length) {
          setTimeout(() => {
            getTabsInfo();
            return;
          }, 10);
        }
        // console.info("res", res);
        // 将分段器每个item的宽度，放入listInfo数组
        res.map((val, index) => {
          state.listInfo[index].width = val.width;
        });
        // 初始化滑块的宽度
        if (props.mode == "subsection") {
          state.itemBgStyle.width = state.listInfo[0].width + "px";
        } else if (props.mode == "button") {
          state.itemBgStyle.width = state.listInfo[0].width + "px";
        }
        // 初始化滑块的位置
        itemBgLeft();
      });
    }

    // 初始化滑块的位置
    function itemBgLeft() {
      // 根据是否开启动画效果，
      if (props.animation) {
        state.itemBgStyle.transition = "all 0.35s";
      } else {
        state.itemBgStyle.transition = "all 0s";
      }
      let left = 0;
      // 计算当前活跃item到组件左边的距离
      state.listInfo.forEach((item, index) => {
        if (index < state.currentIndex) left += item.width;
        item.textStyle = textStyleFun(index);
      });

      // 根据mode不同模式，计算滑块需要移动的距离
      if (props.mode == "subsection") {
        state.itemBgStyle.left = left + "px";
      } else if (props.mode == "button") {
        state.itemBgStyle.left = left + state.buttonPadding + "px";
      }
    }

    // console.info("state", state.listInfo);

    return {
      state,
      changeSectionStatus,
      onClickItem,
      getTabsInfo,
      noBorderRight,
      subsectionStyle,
      itemBarStyle,
      styleObjToString,
    };
  },

  onLoad() {
    //页面初始化执行,用户页面获取参数
    console.info("----onLoad---------");
  },
  onReady() {
    //页面初次渲染完毕执行
    instanceProxy = this;
    console.info("----onReady---------", this);
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-subsection {
  @include vue-flex;

  position: relative;
  align-items: center;
  overflow: hidden;
}

.u-item {
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 6rpx;
  font-size: 26rpx;
  color: $u-main-color;
  text-align: center;
  @include vue-flex;
}

.u-item-bg {
  position: absolute;
  z-index: -1;
  background-color: $u-type-primary;
}

.u-none-border-right {
  border-right: none !important;
}

.u-item-first {
  border-top-left-radius: 8rpx;
  border-bottom-left-radius: 8rpx;
}

.u-item-last {
  border-top-right-radius: 8rpx;
  border-bottom-right-radius: 8rpx;
}

.u-item-text {
  position: relative;
  z-index: 3;
  align-items: center;
  color: $u-main-color;
  transition: all 0.35s;
  @include vue-flex;
}
</style>
