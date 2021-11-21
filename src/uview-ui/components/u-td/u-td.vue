<template>
  <view class="u-td" :style="tdStyle">
    <slot></slot>
  </view>
</template>
<script lang='ts'>
/**
 * td td单元格
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）
 * @tutorial https://www.uviewui.com/components/table.html#td-props
 * @property {String Number} width 单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度（默认auto）
 * @example <u-td>二年级</u-td>
 */
import { defineComponent, reactive, toRefs } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";
import { $parent } from "../../libs/function/$parent";

let instanceProxy: any;

let parent: any;

export default defineComponent({
  name: "u-td",

  props: {
    // 宽度，百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比
    width: {
      type: [Number, String],
      default: "auto",
    },
  },

  setup(props) {
    let state = reactive({
      tdStyle: "",
    });
    // const test = computed(() => {
    // return '';
    // });
    return {
      ...toRefs(state),
      ...toRefs(props),
    };
  },

  mounted() {
    instanceProxy = this;

    parent = false;
    parent = $parent.call(instanceProxy, "u-table");
    if (parent) {
      // 将父组件的相关参数，合并到本组件
      let style: any = {};
      if (instanceProxy.width != "auto") style.flex = `0 0 ${instanceProxy.width}`;
      style.textAlign = parent.align;
      style.fontSize = parent.fontSize + "rpx";
      style.padding = parent.padding;
      style.borderBottom = `solid 1px ${parent.borderColor}`;
      style.borderRight = `solid 1px ${parent.borderColor}`;
      style.color = parent.color;
      instanceProxy.tdStyle = styleObjToString(style);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-td {
  @include vue-flex;

  box-sizing: border-box;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  justify-content: center;
  height: 100%;
  font-size: 28rpx;
  color: $u-content-color;
}
</style>
