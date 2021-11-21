<template>
  <view class="u-demo">
    <view class="u-demo-wrap" style="background-color: #fff">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-calendar
          v-model="show"
          ref="calendar"
          @change="change"
          :mode="mode"
          :start-text="startText"
          :end-text="endText"
          :range-color="rangeColor"
          :range-bg-color="rangeBgColor"
          :active-bg-color="activeBgColor"
          :btn-type="btnType"
        >
        </u-calendar>
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="showBtnStatus"
          :list="['显示', '隐藏']"
          @change="showChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">模式</view>
        <u-subsection
          current="1"
          :list="['单个日期', '日期范围']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义样式</view>
        <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsCalendar",

  setup() {
    let state = reactive({
      show: true,
      mode: "range",
      result: "请选择日期",
      startText: "开始",
      endText: "结束",
      rangeColor: "#2979ff",
      rangeBgColor: "rgba(41,121,255,0.13)",
      activeBgColor: "#2979ff",
      btnType: "primary",
    });

    const showBtnStatus = computed(() => {
      console.log("show:", state.show);
      return state.show ? 0 : 1;
    });

    function showChange(index) {
      state.show = !index;
      console.log("index :", state.show);
      state.show = !index;
    }

    function modeChange(index) {
      state.mode = index == 0 ? "date" : "range";
      state.show = true;
    }

    function styleChange(index) {
      if (index == 0) {
        state.startText = "住店";
        state.endText = "离店";
        state.activeBgColor = "#19be6b";
        state.rangeColor = "#19be6b";
        state.rangeBgColor = "rgba(25,190,107, 0.13)";
        state.btnType = "success";
      } else {
        state.startText = "开始";
        state.endText = "结束";
        state.activeBgColor = "#2979ff";
        state.rangeColor = "#2979ff";
        state.rangeBgColor = "rgba(41,121,255,0.13)";
        state.btnType = "primary";
      }
      state.show = true;
    }

    function change(e) {
      if (state.mode == "range") {
        state.result = e.startDate + " - " + e.endDate;
      } else {
        state.result = e.result;
      }
    }

    return {
      ...toRefs(state),
      showBtnStatus,
      showChange,
      modeChange,
      styleChange,
      change,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
