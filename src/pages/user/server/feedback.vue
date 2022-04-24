<template>
  <view>
    <view v-if="isLogin()">
      <!-- <van-skeleton title avatar avatar-size="64px" row="3" avatar-shape="square" :loading="!feedbackList.feedbackList"> -->
      <uni-list :border="true">
        <!-- 显示圆形头像 -->
        <uni-list-chat
          :avatar-circle="false"
          title="uni-app"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
        ></uni-list-chat>
      </uni-list>
      <!-- </van-skeleton> -->
    </view>
    <view v-else class="unLogin"><text>您还未登录哦~</text><br /><text>登录后查看反馈信息</text></view>
  </view>
</template>

<script setup lang="ts">
import FeedbackApi from '@/request/api/feedback'
import { computed, reactive, ref, watch } from 'vue'
import store from '@/store/index'

interface IfeedbackList {
  feedbackList:
    | {
        context: string
        feedbackId: number
        handleResult: string
        type: string
      }[]
    | null
}

const feedbackList: IfeedbackList = reactive({ feedbackList: null })

function getFeedbackList() {
  FeedbackApi.getFeedbackList('投诉').then((res) => {
    console.log(res)
    if (res.code === 200) {
      feedbackList.feedbackList = res.data
    } else {
      uni.showToast({
        title: res.msg || '商铺获取失败',
        icon: 'none',
      })
    }
  })
}

// 是否已经登录
const isLogin = () => {
  return store.getters.getUserToken !== ''
}

function jumpToProduct(shopId: number) {
  uni.navigateTo({
    url: '/pages/shop/productPage?shopId=' + shopId,
  })
}
</script>
<style scoped lang="scss">
.card-box {
  border-bottom: 1rpx solid #f5f6f8;
  .card {
    background: #ffffff;
  }
}

.unLogin {
  padding-top: 80px;
  font-size: 45rpx;
  text-align: center;
  font-weight: 500;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
  margin-bottom: 6rpx;
}
.tags {
  margin-top: 56rpx;
  .context {
    font-size: 30rpx;
    border: 1rpx solid #cccccc;
    border-radius: 8rpx;
    padding: 4rpx 10rpx;
  }
}
</style>
