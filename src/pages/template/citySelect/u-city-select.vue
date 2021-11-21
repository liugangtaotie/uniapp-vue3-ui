<template>
  <u-popup
    v-model="value"
    mode="bottom"
    :popup="false"
    :mask="true"
    :closeable="true"
    :safe-area-inset-bottom="true"
    close-icon-color="#ffffff"
    :z-index="uZIndex"
    :maskCloseAble="maskCloseAble"
    @close="close"
  >
    <u-tabs
      v-if="value"
      :list="genTabsList"
      :is-scroll="true"
      :current="tabsIndex"
      @change="tabsChange"
      ref="tabs"
    ></u-tabs>
    <view class="area-box">
      <view class="u-flex" :class="{ change: isChange }">
        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group>
                <u-cell-item
                  v-for="(item, index) in provinces"
                  :title="item.label"
                  :arrow="false"
                  :index="index"
                  :key="index"
                  @click="provinceChange"
                >
                  <u-icon
                    v-if="isChooseP && province === index"
                    slot="right-icon"
                    size="34"
                    name="checkbox-mark"
                  ></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>
        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group v-if="isChooseP">
                <u-cell-item
                  v-for="(item, index) in citys"
                  :title="item.label"
                  :arrow="false"
                  :index="index"
                  :key="index"
                  @click="cityChange"
                >
                  <u-icon
                    v-if="isChooseC && city === index"
                    slot="right-icon"
                    size="34"
                    name="checkbox-mark"
                  ></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>

        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group v-if="isChooseC">
                <u-cell-item
                  v-for="(item, index) in areas"
                  :title="item.label"
                  :arrow="false"
                  :index="index"
                  :key="index"
                  @click="areaChange"
                >
                  <u-icon
                    v-if="isChooseA && area === index"
                    slot="right-icon"
                    size="34"
                    name="checkbox-mark"
                  ></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script lang='ts'>
import provinces from "@UVIEW/libs/util/province.js";
import citys from "@UVIEW/libs/util/city.js";
import areas from "@UVIEW/libs/util/area.js";
/**
 * city-select 省市区级联选择器
 * @property {String Number} z-index 弹出时的z-index值（默认1075）
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
 * @property {String} default-region 默认选中的地区，中文形式
 * @property {String} default-code 默认选中的地区，编号形式
 */
import { defineComponent, onMounted, computed, reactive, toRefs } from "vue";
import { zIndex } from "@UVIEW/libs/config/zIndex";

export default defineComponent({
  name: "u-city-select",

  props: {
    // 通过双向绑定控制组件的弹出与收起
    value: {
      type: Boolean,
      default: false,
    },
    // 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
    defaultRegion: {
      type: Array,
      default() {
        return [];
      },
    },
    // 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
    areaCode: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否允许通过点击遮罩关闭Picker
    maskCloseAble: {
      type: Boolean,
      default: true,
    },
    // 弹出的z-index值
    zIndex: {
      type: [String, Number],
      default: 0,
    },
  },

  emits: ["input", "city-change"],

  setup(props: any, { emit }) {
    let state = reactive({
      cityValue: "",
      isChooseP: false, //是否已经选择了省
      province: 0, //省级下标
      provinces: provinces,
      isChooseC: false, //是否已经选择了市
      city: 0, //市级下标
      citys: citys[0],
      isChooseA: false, //是否已经选择了区
      area: 0, //区级下标
      areas: areas[0][0],
      tabsIndex: 0,
    });

    onMounted(() => {
      init();
    });
    const isChange = computed(() => {
      return state.tabsIndex > 1;
    });

    const genTabsList = computed(() => {
      let tabsList = [
        {
          name: "请选择",
        },
      ];
      if (state.isChooseP) {
        tabsList[0]["name"] = state.provinces[state.province]["label"];
        tabsList[1] = {
          name: "请选择",
        };
      }
      if (state.isChooseC) {
        tabsList[1]["name"] = state.citys[state.city]["label"];
        tabsList[2] = {
          name: "请选择",
        };
      }
      if (state.isChooseA) {
        tabsList[2]["name"] = state.areas[state.area]["label"];
      }
      return tabsList;
    });

    const uZIndex = computed(() => {
      // 如果用户有传递z-index值，优先使用
      return props.zIndex ? props.zIndex : zIndex.popup;
    });

    function init() {
      if (props.areaCode.length == 3) {
        setProvince("", props.areaCode[0]);
        setCity("", props.areaCode[1]);
        setArea("", props.areaCode[2]);
      } else if (props.defaultRegion.length == 3) {
        setProvince(props.defaultRegion[0], "");
        setCity(props.defaultRegion[1], "");
        setArea(props.defaultRegion[2], "");
      }
    }

    function setProvince(label = "", value = "") {
      state.provinces.map((v, k) => {
        if (value ? v.value == value : v.label == label) {
          provinceChange(k);
        }
      });
    }

    function setCity(label = "", value = "") {
      state.citys.map((v, k) => {
        if (value ? v.value == value : v.label == label) {
          cityChange(k);
        }
      });
    }

    function setArea(label = "", value = "") {
      state.areas.map((v, k) => {
        if (value ? v.value == value : v.label == label) {
          state.isChooseA = true;
          state.area = k;
        }
      });
    }

    function close() {
      emit("input", false);
    }

    function tabsChange(index) {
      state.tabsIndex = index;
    }

    function provinceChange(index) {
      state.isChooseP = true;
      state.isChooseC = false;
      state.isChooseA = false;
      state.province = index;
      state.citys = citys[index];
      state.tabsIndex = 1;
    }

    function cityChange(index) {
      state.isChooseC = true;
      state.isChooseA = false;
      state.city = index;
      state.areas = areas[state.province][index];
      state.tabsIndex = 2;
    }

    function areaChange(index) {
      state.isChooseA = true;
      state.area = index;
      let result: any = {};
      result.province = state.provinces[state.province];
      result.city = state.citys[state.city];
      result.area = state.areas[state.area];
      emit("city-change", result);
      close();
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      isChange,
      genTabsList,
      uZIndex,
      init,
      setProvince,
      setCity,
      setArea,
      close,
      tabsChange,
      provinceChange,
      cityChange,
      areaChange,
    };
  },
});
</script>

<style scoped lang="scss">
.area-box {
  width: 100%;
  height: 800rpx;
  overflow: hidden;

  > view {
    width: 150%;
    transition: transform 0.3s ease-in-out 0s;
    transform: translateX(0);

    &.change {
      transform: translateX(-33.3333333%);
    }
  }

  .area-item {
    width: 33.3333333%;
    height: 800rpx;
  }
}
</style>
