<template>
  <view class="u-demo">
    <view class="u-demo-wrap" style="background-color: #fff">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-field
          v-model="mobile"
          label="手机号"
          :error-message="errorMessage"
          placeholder="请填写手机号"
          :required="required"
          :icon="icon1"
          :type="type"
        >
        </u-field>
        <u-field
          v-model="code"
          label="验证码"
          placeholder="请填写验证码"
          :required="required"
          :icon="icon2"
        >
          <u-button v-if="showBtn" slot="right" size="mini" type="success">发送验证码</u-button>
        </u-field>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">右侧按钮</view>
        <u-subsection current="1" :list="['是', '否']" @change="showBtnChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">显示错误信息</view>
        <u-subsection current="1" :list="['是', '否']" @change="errorMessageChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">是否必填</view>
        <u-subsection current="1" :list="['是', '否']" @change="requiredChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">显示左图标和右箭头</view>
        <u-subsection current="1" :list="['是', '否']" @change="customChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">第一个输入框为textarea类型</view>
        <u-subsection current="1" :list="['是', '否']" @change="textareaChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { color } from "../../../uview-ui/libs/function/color";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsField",

  setup() {
    let state = reactive({
      mobile: "",
      code: "",
      errorMessage: "",
      required: false,
      placeholderColor: color["tipsColor"],
      arrow: false,
      showBtn: false,
      icon1: "",
      icon2: "",
      type: "text",
    });

    function showBtnChange(index) {
      state.showBtn = index == 0 ? true : false;
    }

    function errorMessageChange(index) {
      instanceProxy.errorMessage = index == 0 ? "手机号有误" : false;
    }

    function requiredChange(index) {
      state.required = index == 0 ? true : false;
    }

    function customChange(index) {
      if (index == 0) {
        state.icon1 = "map";
        state.icon2 = "photo";
        state.arrow = true;
      } else {
        state.icon1 = "";
        state.icon2 = "";
        state.arrow = false;
      }
    }

    function textareaChange(index) {
      state.type = index == 0 ? "textarea" : "text";
    }

    return {
      ...toRefs(state),
      showBtnChange,
      errorMessageChange,
      requiredChange,
      customChange,
      textareaChange,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
</style>
