<template>
  <view>
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="center">费用项</uni-th>
        <uni-th align="center">费用</uni-th>
        <uni-th align="left">开具时间</uni-th>
        <uni-th align="left">操作</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="item of billList.bill" :key="item.billId">
        <uni-td>{{ item.type }}</uni-td>
        <uni-td>{{ item.fare }}</uni-td>
        <uni-td>{{ item.createTime }}</uni-td>
        <uni-td>
          <text v-if="item.pay">已缴费</text>
          <button v-else>缴费</button>
        </uni-td>
      </uni-tr>
    </uni-table>
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
  bill: IbillDetails[] | null
}

const billList: Ibill = reactive({
  bill: [
    {
      billId: 1,
      type: '物业费',
      detail: '这是一个账单',
      fare: 100,
      payTime: null,
      createTime: '2022-04-04T16:30:56',
      file: [],
      pay: false,
    },
  ],
})

// 支付状态
let status = ref(null)
const getBillList = () => {
  CommunityApi.getBillList(status.value).then((res) => {
    if (res.code === 200) {
      billList.bill = res.data.bill
    } else {
      uni.showToast({
        title: res.msg || '账单获取失败',
      })
    }
  })
}
</script>
<style scoped lang="scss"></style>
