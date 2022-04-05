<template>
  <view class="content">
    <!-- <view class="announcement">
      <p>公告列表</p>
      <ul class="announce-ul">
        <li class="announce-li">嗨嗨嗨</li>
      </ul>
    </view> -->
    <van-grid square icon-size="50rpx">
      <van-grid-item
        v-for="item of mainModules"
        :key="item.id"
        icon-prefix="iconfont"
        :icon="item.iconSrc"
        icon-color="#dd5347"
        link-type="navigateTo"
        :url="item.jumpTo"
        :text="item.name"
      >
        <!-- <image style="width: 70%; height: 70%" :src="item.iconSrc" />
        <p>{{ item.name }}</p> -->
      </van-grid-item>
    </van-grid>
    <text v-if="isLogin()">欢迎您 {{ userName() }}</text>
    <van-button v-else type="primary" size="mini" @click="WxLogin">登录</van-button>
    <text selectable="true">userCode: {{ loginCode }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import loginApi from '@/request/api/login'
import UserApi from '@/request/api/user'
import store from '@/store/index'

// 主要模块的展示
const { mainModules, jumpTo } = mainModule()
function mainModule() {
  const mainModules = reactive([
    {
      id: 0,
      name: '缴费',
      iconSrc: 'jiaofei',
      jumpTo: '/pages/mainPages/payPage',
    },
    {
      id: 1,
      name: '报修',
      iconSrc: 'baoxiu',
      jumpTo: '/pages/mainPages/repairPage',
    },
    {
      id: 2,
      name: '社区新闻',
      iconSrc: 'xinwen',
      jumpTo: '/pages/mainPages/newsPage',
    },
    {
      id: 3,
      name: '身份码',
      iconSrc: 'shenfenma',
      jumpTo: '/pages/mainPages/idCodePage',
    },
    {
      id: 4,
      name: '建议',
      iconSrc: 'jianyi',
      jumpTo: '/pages/mainPages/proposalPage',
    },
    {
      id: 5,
      name: '停车位',
      iconSrc: 'tingchewei',
      jumpTo: '/pages/mainPages/parkingSpacePage',
    },
    {
      id: 6,
      name: '投诉',
      iconSrc: 'tousu',
      jumpTo: '/pages/mainPages/complaintPage',
    },
    {
      id: 7,
      name: '访客',
      iconSrc: 'fangke',
      jumpTo: '/pages/mainPages/visitorPage',
    },
  ])
  function jumpTo() {}
  return { mainModules, jumpTo }
}

// 是否已经登录
const isLogin = () => {
  console.log(store.getters.getUserToken || '莫得')
  return store.getters.getUserToken !== ''
}

// 用户信息
const userName = () => {
  let name = store.state.userMsg.userInfo?.name || ''
  let gender = store.state.userMsg.userInfo?.gender || '男'
  if (name !== '') {
    name = name.slice(0, 1) + (gender === '男' ? '先生' : '女士')
  } else {
    name = '小区业主'
  }
  return name
}

// 登录与跳转
let loginCode = ref('')
function WxLogin() {
  // 弹窗，获取用户信息
  uni.getUserProfile({
    desc: '必须授权才可以继续使用',
    success: (res) => {
      // 用户信息
      // console.log(res.userInfo)
      uni.login({
        success: (res) => {
          if (res.code) {
            // 携带 code 发送登录请求
            loginCode.value = res.code
            loginApi.authorization(res.code).then((res) => {
              // console.log(res)
              const { code, data, msg } = res
              if (code === -203) {
                // console.log(msg)
                uni.navigateTo({
                  url: '/pages/login/login',
                })
              } else if (code === 200) {
                store.commit('setUserToken', data.token)
                getUserInfo()
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
    },
    fail: (res) => {
      console.log('授权失败', res)
      uni.showToast({
        title: '您拒绝了登录请求',
        icon: 'error',
        duration: 2000,
      })
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
</script>

<style lang="scss">
.content {
  .announcement {
    margin-top: 10rpx;
    text-align: center;
  }
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
