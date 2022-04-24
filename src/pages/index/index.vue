<template>
  <view class="content">
    <view class="userMsg">
      <view class="community" @click="changeCommunity"
        ><text class="community-name hidden">{{ communityName }}</text
        ><i class="iconfont iconfont-xiangxia icon"></i>
      </view>
      <view class="userName">
        <text v-if="isLogin()" class="hidden">欢迎您：{{ name }}</text>
        <van-button v-else type="primary" size="mini" @click="WxLogin">登录</van-button>
      </view>
    </view>
    <van-grid class="mainModules" square icon-size="50rpx">
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

    <!-- <text selectable="true">userCode: {{ loginCode }}</text> -->
    <view class="shoplist"><ShopList /></view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import loginApi from '@/request/api/login'
import UserApi from '@/request/api/user'
import store from '@/store/index'
import CommunityApi from '@/request/api/community'
import ShopList from '@/pages/shop/index.vue'

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
      name: '社区公告',
      iconSrc: 'xinwen',
      jumpTo: '/pages/mainPages/news/newsPage',
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
  return store.getters.getUserToken !== ''
}
console.log(store.state.userMsg.userToken)
// 用户信息
const { name, communityName } = getUserMsg()
function getUserMsg() {
  let name = ref(store.getters.getUserName || '')
  let communityName = ref('')
  let userName = computed(() => store.getters.getUserName)
  let communityComputer = computed(() => store.state.communityMsg.currentCommunity)
  watch(
    userName,
    (oldName, newName) => {
      console.log(oldName + '  ' + newName)
      // console.log(name.value)
      if (!isLogin()) return
      let gender = ref(store.getters.getUserGender || '男')
      if (oldName) {
        name.value = oldName.slice(0, 1) + (gender.value === '男' ? '先生' : '女士')
      } else {
        name.value = '小区业主'
      }
    },
    { immediate: true }
  )
  watch(
    communityComputer,
    (oldVal, newVal) => {
      // console.log(oldVal + ' ' + newVal)
      if (!isLogin()) communityName.value = '请登录'
      else {
        communityName.value = oldVal?.name!
      }
    },
    {
      immediate: true,
    }
  )
  ;(function getCommunityName() {
    let community = store.state.communityMsg.currentCommunity
    communityName.value = community ? community.name : '请登录'
  })()
  return { name, communityName }
}

// 获取用户信息、所属小区列表、当前浏览的小区信息
const getDate = () => {
  return Promise.all([UserApi.getUserInfo(), CommunityApi.getCommunityList(), CommunityApi.getCommunityDetail()])
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
              console.log(res)
              const { code, data, msg } = res
              if (code === -203) {
                // console.log(msg)
                uni.navigateTo({
                  url: '/pages/login/login',
                })
              } else if (code === 200) {
                store.commit('setUserToken', data.token)
                getDate().then((res) => {
                  console.log(res)
                  const [userInfo, communityList, communityDetail] = res
                  store.commit('setUserInfo', userInfo.data)
                  console.log(communityList.data)
                  store.commit('setCommunityList', communityList.data)
                  store.commit('setCurrentCommunity', communityDetail.data)
                })
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

function changeCommunity() {
  uni.navigateTo({
    url: '/pages/index/changeCommunityPage',
  })
}
</script>

<style lang="scss">
.content {
  margin: 20rpx;
  .announcement {
    margin-top: 10rpx;
    text-align: center;
  }
  .shoplist {
    margin: 0 -20rpx;
  }
}

// .title {
//   font-size: 36rpx;
//   color: #8f8f94;
// }

.userMsg {
  display: flex;
  font-size: 32rpx;
  line-height: 48rpx;
  padding: 0 30rpx;
  // background: #bb3b3f;
  .community {
    width: 50%;
    // background: rebeccapurple;
    flex: none;

    .community-name {
      display: inline-block;
    }
    .icon {
      position: relative;
      display: inline-block;
      top: -12%;
    }
  }
  .userName {
    // background: red;
    text-align: right;
    flex: auto;
  }
}

.hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
