<template>
  <u-modal
    v-model="show"
    :show-cancel-button="true"
    confirm-text="升级"
    title="发现新版本"
    @cancel="cancel"
    @confirm="confirm"
  >
    <view class="u-update-content">
      <rich-text :nodes="content"></rich-text>
    </view>
  </u-modal>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "u-full-screen",

  setup(props: any) {
    let state = reactive({
      show: false,
      content: `
					1. 修复badge组件的size参数无效问题<br>
					2. 新增Modal模态框组件<br>
					3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
					4. 修复键盘组件在微信小程序上遮罩无效的问题
				`,
    });

    onMounted(() => {
      state.show = true;
    });

    function cancel() {
      closeModal();
    }

    function confirm() {
      closeModal();
    }

    function closeModal() {
      (uni as any).navigateBack();
    }

    return {
      ...toRefs(state),
      cancel,
      confirm,
    };
  },

  mounted() {
    instanceProxy = this;
  },

  // onReady() {
  //   instanceProxy.show = true;
  // },
});
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-full-content {
  background-color: #00c777;
}

.u-update-content {
  padding: 30rpx;
  font-size: 26rpx;
  line-height: 1.7;
  color: $u-content-color;
}
</style>
