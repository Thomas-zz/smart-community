<template>
  <view class="content">
    <view class="nowCommunity">
      <text class="nowSee"
        >您正在看：<text class="nowCommunityName">{{ nowCommunity }}</text></text
      >
    </view>
    <van-divider />
    <view v-for="item of communityList" :key="item.communityId" class="content-line" @click="changeCommunity(item)">
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store/index'
import CommunityApi from '@/request/api/community'

const communityList = store.state.communityMsg.communityList
console.log(communityList)
let nowCommunity = ref('')
;(function getCommunityName() {
  let community = store.state.communityMsg.currentCommunity
  nowCommunity.value = community ? community.name : '还未选择小区'
})()

// 切换小区
function changeCommunity(item) {
  console.log(store.state.userMsg.userToken)
  CommunityApi.switchCommunity(item.communityId).then((res) => {
    // console.log(res)
    if (res.code === 200) {
      store.commit('setCurrentCommunity', item)
      store.commit('setUserToken', res.data.token)
      // 返回上一级页面
      uni.navigateBack({
        delta: 1,
      })
    } else {
      uni.showToast({
        title: res.msg || '切换失败！请重试',
        icon: 'none',
      })
    }
  })
}
</script>
<style scoped lang="scss">
.content {
  margin: 20rpx;
  .nowCommunity {
    height: 120rpx;
    font-size: 40rpx;

    .nowSee {
      font-weight: 700;
    }
    .nowCommunityName {
      font-weight: normal;
    }
  }
  .content-line {
    height: 80rpx;
  }
}
</style>
