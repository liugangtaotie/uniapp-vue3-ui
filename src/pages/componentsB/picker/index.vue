<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-demo-result-line">{{ input ? input : "Picker值" }}</view>
        <u-picker
          :mode="mode"
          :defaultTime="defaultTime"
          v-model="show"
          :defaultRegion="defaultRegion"
          :params="params"
          end-year="2030"
          @confirm="confirm"
          :defaultSelector="defaultSelector"
          :range="range"
          :range-key="rangKey"
          @columnchange="columnchange"
        ></u-picker>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">Picker开关</view>
        <u-subsection
          :current="status"
          :list="['显示', '隐藏']"
          @change="statusChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection :list="['单列', '多列', '时间', '地区']" @change="modeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">默认时间</view>
        <u-subsection
          :list="['2019-12-11 20:15:35', '2020-02-05 13:09:42']"
          @change="defaultTimeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">显示时分秒</view>
        <u-subsection :list="['显示', '隐藏']" @change="minSecChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">默认地区</view>
        <u-subsection
          :list="['广东-深圳-宝安', '海南-三亚-海棠']"
          @change="defaultRegionChange"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, computed } from "vue";

export default defineComponent({
  name: "ComponentsPicker",

  setup() {
    let state: any = reactive({
      show: false,
      input: "",
      rangKey: "name",
      mode: "selector",
      range: ["一", "片", "冰", "心", "在", "玉", "壶"],
      defaultTime: "2019-12-11 20:15:35",
      defaultSelector: [0],
      defaultRegion: ["广东省", "深圳市", "宝安区"],
      params: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: true,
        province: true,
        city: true,
        area: true,
        timestamp: true,
      },
    });

    const status = computed(() => {
      return state.show == true ? 0 : 1;
    });

    function statusChange(index) {
      state.show = index == 0 ? true : false;
    }

    function modeChange(index) {
      state.mode = ["selector", "multiSelector", "time", "region"][index];
      if (state.mode == "selector") {
        state.range = ["一", "片", "冰", "心", "在", "玉", "壶"];
        state.defaultSelector = [0];
      }
      if (state.mode == "multiSelector") {
        state.range = [
          ["亚洲", "欧洲"],
          ["中国", "日本"],
          ["北京", "上海", "广州"],
        ];
        state.defaultSelector = [0, 0, 0];
      }
      state.show = true;
    }

    function defaultTimeChange(index) {
      state.defaultTime = index == 0 ? "2019-12-11 20:15:35" : "2020-02-05 13:09:42";
      state.mode = "time";
      state.show = true;
    }

    function defaultRegionChange(index) {
      state.defaultRegion =
        index == 0 ? ["广东省", "深圳市", "宝安区"] : ["海南省", "三亚市", "海棠区"];
      state.mode = "region";
      state.show = true;
    }

    function minSecChange(index) {
      if (index == 0) {
        state.params.hour = true;
        state.params.minute = true;
        state.params.second = true;
      }
      if (index == 1) {
        state.params.hour = false;
        state.params.minute = false;
        state.params.second = false;
      }
      state.mode = "time";
      state.show = true;
    }

    function confirm(e) {
      // console.log(e);
      state.input = "";
      if (state.mode == "time") {
        if (state.params.year) state.input += e.year;
        if (state.params.month) state.input += "-" + e.month;
        if (state.params.day) state.input += "-" + e.day;
        if (state.params.hour) state.input += " " + e.hour;
        if (state.params.minute) state.input += ":" + e.minute;
        if (state.params.second) state.input += ":" + e.second;
      } else if (state.mode == "region") {
        state.input = e.province.label + "-" + e.city.label + "-" + e.area.label;
      } else if (state.mode == "selector") {
        state.input = state.range[e[0]];
      } else if (state.mode == "multiSelector") {
        state.input =
          state.range[0][e[0]] + "-" + state.range[1][e[1]] + "-" + state.range[2][e[2]];
      }
    }

    function columnchange(e) {
      let column = e.column,
        index = e.index;
      state.defaultSelector[column] = index;
      switch (column) {
        case 0:
          switch (index) {
            case 0:
              state.range[1] = ["中国", "日本"];
              state.range[2] = ["北京", "上海", "广州"];
              break;
            case 1:
              state.range[1] = ["英国", "法国"];
              state.range[2] = ["伦敦", "曼彻斯特"];
              break;
          }
          state.defaultSelector.splice(1, 1, 0);
          state.defaultSelector.splice(2, 1, 0);
          break;
        case 1: //拖动第2列
          switch (
            state.defaultSelector[0] //判断第一列是什么
          ) {
            case 0:
              switch (state.defaultSelector[1]) {
                case 0:
                  state.range[2] = ["北京", "上海", "广州"];
                  break;
                case 1:
                  state.range[2] = ["东京", "北海道"];
                  break;
              }
              break;
            case 1:
              switch (state.defaultSelector[1]) {
                case 0:
                  state.range[2] = ["伦敦", "曼彻斯特"];
                  break;
                case 1:
                  state.range[2] = ["巴黎", "马赛"];
                  break;
              }
              break;
          }
          state.defaultSelector.splice(2, 1, 0);
          break;
      }
    }

    return {
      ...toRefs(state),
      status,
      statusChange,
      modeChange,
      defaultTimeChange,
      defaultRegionChange,
      minSecChange,
      confirm,
      columnchange,
    };
  },
});
</script>

<style lang="scss" scoped>
.input {
  flex: 1;
  height: 30px;
  margin-bottom: 20px;
  font-size: 26rpx;
  border: 1px solid $u-light-color;
  border-radius: 4px;
}

.input-wrap {
  display: flex;
}
</style>
