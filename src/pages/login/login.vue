<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png" /> -->
    <!-- <view class="">
      <uni-forms :model-value="formData">
        <uni-forms-item label="手机号" name="phone">
          <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入电话号码" />
        </uni-forms-item>
        <uni-forms-item name="checkCode" label="验证码">
          <uni-easyinput v-model="formData.checkCode" type="text" multiple />
        </uni-forms-item>
        <button @click="sendCheckCode">获取验证码</button>
      </uni-forms>
      <button @click="submitForm">注册</button>
    </view> -->
    <van-cell-group>
      <van-field
        :value="formData.phone"
        label="手机号"
        placeholder="请输入手机号"
        border="{{ false }}"
        @change="onPhoneChange"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        :value="formData.checkCode"
        center
        clearable
        label="短信验证码"
        placeholder="请输入验证码"
        border="{{ false }}"
        use-button-slot
        @change="onCodeChange"
      >
        <van-button slot="button" size="small" type="primary" :disabled="isSend" @click="sendCheckCode">
          <span class="sendCodeBtn">{{ sendBtnMsg }}</span>
        </van-button>
      </van-field>
    </van-cell-group>
    <view class="sendBtn">
      <van-button round type="info" size="large" @click="submitForm">进入社区</van-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Toast from '@/wxcomponents/vant/toast/toast'
import loginApi from '@/request/api/login'
import UserApi from '@/request/api/user'
import store from '@/store/index'

// 是否已发送验证码
let isSend = false
let sendTime = 10
let sendBtnMsg = ref('发送验证码')

// 表单数据
const formData = reactive({
  phone: '',
  checkCode: '',
})

const onPhoneChange = (event) => {
  formData.phone = event.detail
}

const onCodeChange = (event) => {
  formData.checkCode = event.detail
}

// 发送验证码
const sendCheckCode = () => {
  if (sendTime === 0) {
    isSend = false
    sendBtnMsg.value = '发送验证码'
    sendTime = 10
  } else {
    sendBtnMsg.value = `重新发送(${sendTime})`
    sendTime--
    if (!isSend) {
      loginApi.sendMessage(formData.phone).then((res) => {
        console.log(res)
        if (res.code !== 200) {
          uni.showToast({
            title: res.msg || '请求有误',
            icon: 'none',
            duration: 2000,
          })
        } else {
        }
      })
      isSend = true
    }
    setTimeout(() => {
      sendCheckCode()
    }, 1000)
  }
}

// 提交注册信息，校验验证码
const submitForm = () => {
  uni.login({
    success: (res) => {
      if (res.code) {
        // 携带 code 发送注册请求
        // console.log(res.code)
        loginApi.checkCode(formData.checkCode, formData.phone, res.code).then((res) => {
          // console.log(res)
          if (res.code === -100) {
            uni.showToast({
              title: res.errMsg || '验证码有误',
            })
          } else if (res.code === 200) {
            // 登录成功，拿到 token
            const token = res.data.token
            // 存入 vuex 中
            store.commit('setUserToken', token)
            uni.showToast({
              title: '登录中',
              icon: 'loading',
            })
            // 获取用户个人信息
            getUserInfo()
            // 获取用户所属小区列表
            getCommunityList()
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
        uni.showToast({
          title: res.errMsg || '登录失败！',
        })
      }
    },
    fail(e) {
      // console.log(e)
    },
    complete(e) {
      // console.log(e)
    },
  })
}

// 获取用户信息
const getUserInfo = () => {
  UserApi.getUserInfo().then((res) => {
    console.log(res)
    if (res.code === 200) {
      store.commit('setUserInfo', res.data)
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index',
        })
      }, 1500)
    } else {
      uni.showToast({
        title: res.msg || '用户信息获取失败',
      })
    }
  })
}

// 获取用户所属小区列表
const getCommunityList = () => {
  UserApi.getCommunityList().then((res) => {
    if (res.code === 200) {
      store.commit('setCommunityList', res.data)
    } else {
      uni.showToast({
        title: res.msg || '用户信息获取失败',
      })
    }
  })
}
</script>

<style lang="scss">
.content {
  .sendCodeBtn {
    display: block;
    width: 170rpx;
  }
  .sendBtn {
    padding: 25rpx;
  }
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
