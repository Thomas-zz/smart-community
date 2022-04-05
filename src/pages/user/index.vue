<template>
  <view>
    <view class="head">
      <img
        class="headImg"
        src="https://i2.hdslb.com/bfs/face/85a34b1d1b7b892cfa4d39f67f1209675a31ea91.jpg@150w_150h.jpg"
      />
      <text class="username">用户名</text>
    </view>
    <div class="text-lg text-red-700">hello</div>
  </view>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  .headImg {
    width: 150rpx;
    height: 150rpx;
    box-sizing: border-box;
    border-radius: 50%;
  }
}
</style>
