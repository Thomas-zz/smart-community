<template>
  <view class="content">
    <view class="title">
      <view style="text-align: center; margin-bottom: 10rpx"
        ><i class="iconfont iconfont-zhifuchenggong icon"></i
      ></view>
      <view>支付成功</view>
    </view>
    <view class="main">
      <view class="shopName">{{ name }}</view>
      <view class="price">¥{{ price }}</view>
      <view class="tip">如需预约服务，请在订单详情页中选择服务时间</view>
    </view>
    <button class="btn" plain="true" @click="jumpTo()">完成</button>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

let name = ref('')
let price = ref(0)
onLoad((option) => {
  name.value = option.productName!
  price.value = Number(option.price)
})

function jumpTo() {
  uni.navigateBack({
    delta: 3,
  })
}
</script>
<style scoped lang="scss">
.content {
  margin: 30rpx;
  text-align: center;
  // background: red;
}
.title {
  padding-top: 40px;
  color: #18ad18;
  font-size: 50rpx;
}
.main {
  margin-top: 60px;

  .shopName {
    font-size: 36rpx;
  }
  .price {
    font-size: 70rpx;
    font-weight: 500;
  }
}
.tip {
  font-size: 32rpx;
}

.btn {
  margin-top: 160px;
  font-size: 34rpx;
  height: 30px;
  padding: 0;
  line-height: 30px;
  width: 50%;
  border: 2px solid #dd5347;
  color: #dd5347;
  border-radius: 10rpx;
}

.icon {
  font-size: 50px;
}
</style>
