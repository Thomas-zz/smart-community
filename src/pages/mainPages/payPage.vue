<template>
  <view class="container">
    <van-skeleton title avatar row="3" :loading="billList.data === null">
      <view class="pay-list">
        <van-row class="pay-title">
          <van-col span="4">所属小区</van-col>
          <van-col span="5">费用项</van-col>
          <van-col span="4">费用</van-col>
          <van-col span="7">开具时间</van-col>
          <van-col span="4">操作</van-col>
        </van-row>
        <view class="pay-items">
          <view v-for="node of billList.data" :key="node.communityId">
            <van-row class="pay-item" v-for="item of node.bill" :key="item.billId">
              <van-col span="4">{{ node.communityName }}</van-col>
              <van-col span="5">{{ item.type }}</van-col>
              <van-col span="4">{{ item.fare }}</van-col>
              <van-col span="7">{{ item.createTime.split('T')[0].split('-').join('.') }}</van-col>
              <van-col span="4">
                <p v-if="item.pay">已缴费</p>
                <van-button v-else type="primary" size="mini">缴费</van-button>
              </van-col>
            </van-row>
          </view>
        </view>
      </view>
    </van-skeleton>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import CommunityApi from '@/request/api/community'
import UserApi from '@/request/api/user'

interface IbillDetails {
  billId: number
  type: string
  detail: string
  fare: number
  payTime?: null | string
  createTime: string
  file: []
  pay: boolean
}

interface Ibill {
  data:
    | {
        communityId: number
        communityName: string
        bill: IbillDetails[] | null
      }[]
    | null
}

const billList: Ibill = reactive({
  data: null,
})

// 支付状态
let status = ref(null)
getBillList()
function getBillList() {
  CommunityApi.getBillList(status.value).then((res) => {
    console.log(res)
    if (res.code === 200) {
      billList.data = res.data
    } else {
      uni.showToast({
        title: res.msg || '账单获取失败',
      })
    }
    console.log(billList.data)
  })
}
</script>
<style scoped lang="scss">
.container {
  margin: 20rpx 15rpx;
}
.pay-list {
  text-align: center;
  margin-top: 20rpx;
  .pay-title {
    font-size: 11px;
  }
  .pay-items {
    font-size: 28rpx;
    color: #767676;
    margin-top: 10rpx;
    border-top: 1px solid #eceef0;

    .pay-item {
      line-height: 85rpx;
      align-items: center;
    }
  }
}
</style>
