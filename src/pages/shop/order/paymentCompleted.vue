<template>
  <view>
    <view class="main">
      <view>支付成功</view>
      <view class="shopName">{{ name }}</view>
      <view class="price">¥{{ price }}</view>
      <view class="tip">如需预约服务，请在订单详情页中选择服务时间</view>
    </view>
    <view class="completeBtn">
      <van-button round type="info" size="large" @click="jumpTo()">完成</van-button>
    </view>
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
.main {
  text-align: center;
  .shopName {
    font-size: 18rpx;
    color: #888888;
  }
  .price {
    font-size: 40rpx;
  }
  .tip {
    font-size: 20px;
  }
}
</style>
