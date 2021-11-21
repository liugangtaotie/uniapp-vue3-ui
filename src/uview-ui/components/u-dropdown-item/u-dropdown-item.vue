<template>
  <view
    class="u-dropdown-item"
    v-if="active"
    @touchmove.stop.prevent="() => {}"
    @tap.stop.prevent="() => {}"
  >
    <block v-if="!$slots.default && !$slots.$default">
      <scroll-view
        scroll-y="true"
        :style="{
          height: $u.addUnit(height),
        }"
      >
        <view class="u-dropdown-item__options">
          <u-cell-group>
            <u-cell-item
              @click="cellClick(item.value)"
              :arrow="false"
              :title="item.label"
              v-for="(item, index) in options"
              :key="index"
              :title-style="{
                color: value == item.value ? activeColor : inactiveColor,
              }"
            >
              <u-icon
                v-if="value == item.value"
                name="checkbox-mark"
                :color="activeColor"
                size="32"
              ></u-icon>
            </u-cell-item>
          </u-cell-group>
        </view>
      </scroll-view>
    </block>
    <slot v-else />
  </view>
</template>

<script lang='ts'>
/**
 * dropdown-item 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @tutorial http://uviewui.com/components/dropdown.html
 * @property {String | Number} v-model 双向绑定选项卡选择值
 * @property {String} title 菜单项标题
 * @property {Array[Object]} options 选项数据，如果传入了默认slot，此参数无效
 * @property {Boolean} disabled 是否禁用此选项卡（默认false）
 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300）
 * @property {String | Number} height 弹窗下拉内容的高度(内容超出将会滚动)（默认auto）
 * @example <u-dropdown-item title="标题"></u-dropdown-item>
 */
import { defineComponent, onMounted, computed, reactive, toRefs, watch } from "vue";
import { $parent } from "../../libs/function/$parent";

let instanceProxy: any;

export default defineComponent({
  name: "u-dropdown-item",

  props: {
    // 当前选中项的value值
    value: {
      type: [Number, String, Array],
      default: "",
    },
    // 菜单项标题
    title: {
      type: [String, Number],
      default: "",
    },
    // 选项数据，如果传入了默认slot，此参数无效
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否禁用此菜单项
    disabled: {
      type: Boolean,
      default: false,
    },
    // 下拉弹窗的高度
    height: {
      type: [Number, String],
      default: "auto",
    },
  },

  emits: ["input", "change"],

  setup(props: any, { emit }) {
    let state = reactive({
      active: false, // 当前项是否处于展开状态
      activeColor: "#2abc6d", // 激活时左边文字和右边对勾图标的颜色
      inactiveColor: "#606266", // 未激活时左边文字和右边对勾图标的颜色
      parent: "" as any,
    });

    watch(
      () => propsChange,
      () => {}
    );

    // 父组件的实例
    state.parent = false;

    onMounted(() => {
      init();
    });
    // 监听props是否发生了变化，有些值需要传递给父组件u-dropdown，无法双向绑定

    const propsChange = computed(() => {
      // 当值变化时，通知父组件重新初始化，让父组件执行每个子组件的init()方法
      // 将所有子组件数据重新整理一遍
      if (state.parent) state.parent.init();
    });

    function init() {
      // 获取父组件u-dropdown
      let parent = $parent.call(instanceProxy, "u-dropdown");
      if (parent) {
        state.parent = parent;
        // 将子组件的激活颜色配置为父组件设置的激活和未激活时的颜色
        state.activeColor = parent.activeColor;
        state.inactiveColor = parent.inactiveColor;
        // 将本组件的this，放入到父组件的children数组中，让父组件可以操作本(子)组件的方法和属性
        // push进去前，显判断是否已经存在了本实例，因为在子组件内部数据变化时，会通过父组件重新初始化子组件
        let exist = parent.children.find((val) => {
          return instanceProxy === val;
        });
        if (!exist) parent.children.push(instanceProxy);
        if (parent.children.length == 1) state.active = true;
        // 父组件无法监听children的变化，故将子组件的title，传入父组件的menuList数组中
        parent.menuList.push({
          title: props.title,
          disabled: props.disabled,
        });
      }
    }

    // cell被点击
    function cellClick(value) {
      // 修改通过v-model绑定的值
      emit("input", value);
      // 通知父组件(u-dropdown)收起菜单
      state.parent.close();
      // 发出事件，抛出当前勾选项的value
      emit("change", value);
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      propsChange,
      init,
      cellClick,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";
</style>
