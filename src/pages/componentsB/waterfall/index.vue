<template>
  <view class="wrap">
    <u-waterfall v-model="flowList" ref="uWaterfall">
      <template v-slot:left="{ leftList }">
        <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
          <!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.image"
            :index="index"
          ></u-lazy-load>
          <view class="demo-title">{{ item.title }}</view>
          <view class="demo-price">{{ item.price }}元</view>
          <view class="demo-tag">
            <view class="demo-tag-owner">自营</view>
            <view class="demo-tag-text">放心购</view>
          </view>
          <view class="demo-shop">{{ item.shop }}</view>
          <view class="u-close">
            <u-icon
              name="close-circle-fill"
              color="#fa3534"
              size="34"
              @click="remove(item.id)"
            ></u-icon>
          </view>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view class="demo-warter" v-for="(item, index) in rightList" :key="index">
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.image"
            :index="index"
          ></u-lazy-load>
          <view class="demo-title">{{ item.title }}</view>
          <view class="demo-price">{{ item.price }}元</view>
          <view class="demo-tag">
            <view class="demo-tag-owner">自营</view>
            <view class="demo-tag-text">放心购</view>
          </view>
          <view class="demo-shop">{{ item.shop }}</view>
          <view class="u-close">
            <u-icon
              name="close-circle-fill"
              color="#fa3534"
              size="34"
              @click="remove(item.id)"
            ></u-icon>
          </view>
        </view>
      </template>
    </u-waterfall>
    <u-loadmore
      bg-color="rgb(240, 240, 240)"
      :status="loadStatus"
      @loadmore="addRandomData"
    ></u-loadmore>
  </view>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { random } from "@UVIEW/libs/function/random";
import { guid } from "@UVIEW/libs/function/guid";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsWaterfall",

  onLoad() {
    console.info("instanceProxy;", instanceProxy);
    this.addRandomData();
  },

  onReachBottom() {
    this.loadStatus = "loading";
    // 模拟数据加载
    setTimeout(() => {
      this.addRandomData();
      this.loadStatus = "loadmore";
    }, 1000);
  },

  setup() {
    let state = reactive({
      loadStatus: "loadmore",
      flowList: [] as any,
      list: [
        {
          price: 35,
          title: "北国风光，千里冰封，万里雪飘",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
        },
        {
          price: 75,
          title: "望长城内外，惟余莽莽",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg",
        },
        {
          price: 385,
          title: "大河上下，顿失滔滔",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
        },
        {
          price: 784,
          title: "欲与天公试比高",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg",
        },
        {
          price: 7891,
          title: "须晴日，看红装素裹，分外妖娆",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg",
        },
        {
          price: 2341,
          shop: "李白杜甫白居易旗舰店",
          title: "江山如此多娇，引无数英雄竞折腰",
          image: "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg",
        },
        {
          price: 661,
          shop: "李白杜甫白居易旗舰店",
          title: "惜秦皇汉武，略输文采",
          image: "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg",
        },
        {
          price: 1654,
          title: "唐宗宋祖，稍逊风骚",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
        {
          price: 1678,
          title: "一代天骄，成吉思汗",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
        {
          price: 924,
          title: "只识弯弓射大雕",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
        {
          price: 8243,
          title: "俱往矣，数风流人物，还看今朝",
          shop: "李白杜甫白居易旗舰店",
          image: "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
      ],
    });

    onMounted(() => {});

    function addRandomData() {
      for (let i = 0; i < 10; i++) {
        let index = random(0, state.list.length - 1);
        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(state.list[index]));
        item.id = guid();
        state.flowList.push(item);
      }
    }

    function remove(id) {
      // this.$refs.uWaterfall.remove(id);
    }

    function clear() {
      // this.$refs.uWaterfall.clear();
    }

    return {
      ...toRefs(state),
      addRandomData,
      remove,
      clear,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style>
/* page不能写带scope的style标签中，否则无效 */
page {
  background-color: rgb(240, 240, 240);
}
</style>

<style lang="scss" scoped>
.demo-warter {
  position: relative;
  padding: 8px;
  margin: 5px;
  background-color: #fff;
  border-radius: 8px;
}

.u-close {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
}

.demo-image {
  width: 100%;
  border-radius: 4px;
}

.demo-title {
  margin-top: 5px;
  font-size: 30rpx;
  color: $u-main-color;
  word-break: break-all;
}

.demo-tag {
  display: flex;
  margin-top: 5px;
}

.demo-tag-owner {
  display: flex;
  align-items: center;
  padding: 4rpx 14rpx;
  font-size: 20rpx;
  line-height: 1;
  color: #fff;
  background-color: $u-type-error;
  border-radius: 50rpx;
}

.demo-tag-text {
  display: flex;
  align-items: center;
  padding: 4rpx 14rpx;
  margin-left: 10px;
  font-size: 20rpx;
  line-height: 1;
  color: $u-type-primary;
  border: 1px solid $u-type-primary;
  border-radius: 50rpx;
}

.demo-price {
  margin-top: 5px;
  font-size: 30rpx;
  color: $u-type-error;
}

.demo-shop {
  margin-top: 5px;
  font-size: 22rpx;
  color: $u-tips-color;
}
</style>
