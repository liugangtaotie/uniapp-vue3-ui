<template>
  <view
    class="u-col"
    :class="['u-col-' + span]"
    :style="{
      padding: `0 ${Number(gutter) / 2 + 'rpx'}`,
      marginLeft: (100 / 12) * offset + '%',
      flex: `0 0 ${(100 / 12) * span}%`,
      alignItems: uAlignItem,
      justifyContent: uJustify,
      textAlign: textAlign,
    }"
    @tap="click"
  >
    <slot></slot>
  </view>
</template>

<script lang='ts'>
/**
 * col 布局单元格
 * @description 通过基础的 12 分栏，迅速简便地创建布局（搭配<u-row>使用）
 * @tutorial https://www.uviewui.com/components/layout.html
 * @property {String Number} span 栅格占据的列数，总12等分（默认0）
 * @property {String} text-align 文字水平对齐方式（默认left）
 * @property {String Number} offset 分栏左边偏移，计算方式与span相同（默认0）
 * @example <u-col span="3"><view class="demo-layout bg-purple"></view></u-col>
 */
import { defineComponent, computed, reactive, toRefs } from "vue";
import { $parent } from "../../libs/function/$parent";
let instanceProxy: any;

export default defineComponent({
  name: "u-col",

  props: {
    // 占父容器宽度的多少等分，总分为12份
    span: {
      type: [Number, String],
      default: 12,
    },
    // 指定栅格左侧的间隔数(总12栏)
    offset: {
      type: [Number, String],
      default: 0,
    },
    // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
    justify: {
      type: String,
      default: "start",
    },
    // 垂直对齐方式，可选值为top、center、bottom
    align: {
      type: String,
      default: "center",
    },
    // 文字对齐方式
    textAlign: {
      type: String,
      default: "left",
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: true,
    },
  },

  emits: ["click"],

  setup(props: any, { emit }) {
    let state = reactive({
      gutter: 20, // 给col添加间距，左右边距各占一半，从父组件u-row获取
    });

    const uJustify = computed(() => {
      if (props.justify == "end" || props.justify == "start") return "flex-" + props.justify;
      else if (props.justify == "around" || props.justify == "between")
        return "space-" + props.justify;
      else return props.justify;
    });

    const uAlignItem = computed(() => {
      if (props.align == "top") return "flex-start";
      if (props.align == "bottom") return "flex-end";
      else return props.align;
    });

    function click(e) {
      emit("click");
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      uJustify,
      uAlignItem,
      click,
    };
  },

  mounted() {
    instanceProxy = this;

    // 获取父组件实例，并赋值给对应的参数
    const parent = $parent.call(this, "u-row");
    if (parent) {
      this.gutter = parent.gutter;
    }
  },
});
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-col {
  /* #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
  float: left;

  /* #endif */
}

.u-col-0 {
  width: 0;
}

.u-col-1 {
  width: calc(100% / 12);
}

.u-col-2 {
  width: calc(100% / 12 * 2);
}

.u-col-3 {
  width: calc(100% / 12 * 3);
}

.u-col-4 {
  width: calc(100% / 12 * 4);
}

.u-col-5 {
  width: calc(100% / 12 * 5);
}

.u-col-6 {
  width: calc(100% / 12 * 6);
}

.u-col-7 {
  width: calc(100% / 12 * 7);
}

.u-col-8 {
  width: calc(100% / 12 * 8);
}

.u-col-9 {
  width: calc(100% / 12 * 9);
}

.u-col-10 {
  width: calc(100% / 12 * 10);
}

.u-col-11 {
  width: calc(100% / 12 * 11);
}

.u-col-12 {
  width: calc(100% / 12 * 12);
}
</style>
