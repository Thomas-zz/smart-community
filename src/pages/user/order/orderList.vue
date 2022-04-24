<template>
  <view>
    <view>
      <van-tabs
        :active="active"
        :change="onChange"
        line-width="20px"
        line-height="2px"
        title-inactive-color="#525252"
        title-active-color="#dd5347"
      >
        <van-tab title="全部"></van-tab>
        <van-tab title="待付款"></van-tab>
        <van-tab title="待确认"></van-tab>
        <van-tab title="待使用"></van-tab>
        <van-tab title="已完成"></van-tab>
        <van-tab title="已取消"></van-tab>
      </van-tabs>
      <van-skeleton title avatar avatar-size="64px" row="3" avatar-shape="square" :loading="!orderList.list">
        <view v-for="item of orderList.list" :key="item.shoppingOrderId" @click="jumpToDetail(item.shoppingOrderId)">
          <van-card
            :price="item.total"
            :desc="item.description"
            :thumb="item.commodityImageUrl[0]"
            thumb-mode="aspectFill"
          >
            <view slot="title" class="title">
              <text>{{ item.shopName }}</text>
            </view>
            <view slot="tags" class="tags">
              <text class="context">{{ item.orderStatus }}</text>
            </view>
          </van-card>
        </view>
      </van-skeleton>
    </view>
  </view>
</template>

<script setup lang="ts">
import ShoppingApi from '@/request/api/shopping'
import { onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'

interface IorderList {
  list:
    | {
        description: string
        commodityImageUrl: string[]
        orderStatus: string
        shopId: number
        shopName: string
        shoppingOrderId: number
        total: number
      }[]
    | null
}

const orderList: IorderList = reactive({ list: null })

let active = ref(0)
function onChange(event) {
  active.value = event.detail
}

onShow(() => {
  console.log('hi')
  orderList.list = null
  ShoppingApi.shoppingInfo(1, 10).then((res) => {
    console.log(res)
    if (res.code === 200) {
      orderList.list = res.data.data
    } else {
      uni.showToast({
        title: res.msg || '订单列表获取失败',
        icon: 'none',
      })
    }
  })
})

function jumpToDetail(orderId: number) {
  uni.navigateTo({
    url: '/pages/user/order/orderDetail?orderId=' + orderId,
  })
}
</script>
<style scoped lang="scss"></style>
