<template>
  <view class="u-th" :style="thStyle">
    <slot></slot>
  </view>
</template>
<script lang='ts'>
/**
 * th th单元格
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）
 * @tutorial https://www.uviewui.com/components/table.html#td-props
 * @property {String Number} width 标题单元格宽度百分比或者具体带单位的值，如30%，200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度
 * @example 暂无示例
 */
import { defineComponent, reactive, toRefs } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";
import { $parent } from "../../libs/function/$parent";

let instanceProxy: any;
let parent: any;

export default defineComponent({
  name: "u-th",

  props: {
    // 宽度，百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比
    width: {
      type: [Number, String],
      default: "",
    },
  },

  setup(props) {
    let state = reactive({
      thStyle: "",
    });

    return {
      ...toRefs(state),
      ...toRefs(props),
    };
  },
  mounted() {
    instanceProxy = this;

    parent = false;
    parent = $parent.call(instanceProxy, "u-table");
    if (instanceProxy.parent) {
      // 将父组件的相关参数，合并到本组件
      let style: any = {};
      if (instanceProxy.width) style.flex = `0 0 ${instanceProxy.width}`;
      style.textAlign = parent.align;
      style.padding = parent.padding;
      style.borderBottom = `solid 1px ${parent.borderColor}`;
      style.borderRight = `solid 1px ${parent.borderColor}`;
      Object.assign(style, parent.style);
      this.thStyle = styleObjToString(style);
      console.log("thStyle:", this.thStyle);
      console.log("thStyle1:", instanceProxy.thStyle);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-th {
  @include vue-flex;

  flex: 1;
  flex-direction: column;
  justify-content: center;
  font-size: 28rpx;
  font-weight: bold;
  color: $u-main-color;
  background-color: rgb(245, 246, 248);
}
</style>
