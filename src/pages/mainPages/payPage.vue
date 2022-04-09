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
                <van-button v-else type="primary" size="mini" @click="payPopup(node.communityId, item.billId)"
                  >缴费</van-button
                >
              </van-col>
            </van-row>
          </view>
        </view>
      </view>
    </van-skeleton>
    <van-popup round position="bottom" custom-style="height: 40%" :show="show" @close="closePopup">
      <view class="pop-box" :class="{ toLeft: ifComfirm }">
        <view class="pop-context">
          <view class="pop-title">确认账单</view>
          <view class="pop-content">
            <view class="content-line">
              <text>所属小区</text>
              <text>{{ showMsg.data?.communityName }}</text>
            </view>
            <view class="content-line">
              <text>费用项</text>
              <text>{{ showMsg.data?.billDetail!.type }}</text>
            </view>
            <view class="content-line">
              <text>应缴费用</text>
              <text>{{ showMsg.data?.billDetail!.fare }}</text>
            </view>
            <view class="content-line">
              <text>开具时间</text>
              <text>{{ showMsg.data?.billDetail!.createTime }}</text>
            </view>
          </view>
          <view class="content-line">
            <van-button type="default" size="mini" @click="closePopup">取消</van-button>
            <van-button type="primary" size="mini" @click="changePopup">缴费</van-button>
          </view>
        </view>
        <view class="pop-pwd">
          <view class="pop-title">输入密码</view>
          <view class="pwdInput">
            <van-field
              :value="password"
              type="password"
              placeholder="请输入密码"
              :border="true"
              @change="onCodeChange"
            />
          </view>
          <van-button type="default" size="mini" @click="payForDetail">提交</van-button>
        </view>
      </view>
    </van-popup>
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

// 弹出层的数据
interface IshowMsgData {
  communityName: string
  billDetail: IbillDetails | null
}
interface IshowMsg {
  data: IshowMsgData | null
}

const billList: Ibill = reactive({
  data: null,
})

// 支付状态
let status = ref(false)
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

let show = ref(false)
// 弹出缴费弹出层
let showMsg: IshowMsg = reactive({ data: null })
function payPopup(communityId: number, billId: number) {
  show.value = true
  // 缴费层数据
  for (let item of billList.data!) {
    console.log(item)
    if (item.communityId === communityId) {
      showMsg.data = { communityName: '', billDetail: null }
      ;(<IshowMsgData>showMsg.data).communityName = item.communityName
      for (let nextItem of item.bill!) {
        if (nextItem.billId === billId) {
          ;(<IshowMsgData>showMsg.data).billDetail = nextItem
        }
      }
    }
  }
  console.log(showMsg)
}

// 关闭弹出层
function closePopup() {
  show.value = false
  password.value = ''
  setTimeout(() => {
    ifComfirm.value = false
  }, 300)
}

const password = ref('')
function onCodeChange(event) {
  password.value = event.detail
}
async function payForDetail() {
  console.log(showMsg.data?.billDetail?.billId)
  await UserApi.payBill(showMsg.data?.billDetail?.billId!, password.value).then((res) => {
    if (res.code === 200) {
      // 获取更新后的账单
      getBillList()
      uni.showToast({
        title: '支付成功',
        icon: 'none',
        duration: 2000,
      })
      closePopup()
    } else {
      uni.showToast({
        title: res.msg || '请求有误',
        icon: 'none',
        duration: 2000,
      })
      closePopup()
    }
  })
}

// 切换弹出层
let ifComfirm = ref(false)
function changePopup() {
  ifComfirm.value = !ifComfirm.value
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

.pop-box {
  background: #25aff3;
  transform: translate(0);
  transition: all 0.3s ease-out;
  position: relative;
  height: 100%;
  width: 1500rpx;
  .pop-title {
    font-size: 36rpx;
    text-align: center;
    background: #fe315d;
  }
  .pop-context {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    height: 100%;
    background: #bd3831;

    .pop-content {
      background: #229342;
      .content-line {
        &:first-child {
          background: #fbc21c;
          width: 35%;
        }
      }
    }
  }
  .pop-pwd {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    height: 100%;
    background: #2e2e2e;
  }
}

.toLeft {
  transform: translate(-50%);
}
</style>
