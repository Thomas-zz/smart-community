import CommunityApi from '@/request/api/community'
import store from '@/store'

// 获取用户所属小区列表
const getCommunityList = () => {
  CommunityApi.getCommunityList().then((res) => {
    console.log(res)
    if (res.code === 200) {
      store.commit('setCommunityList', res.data)
    } else {
      uni.showToast({
        title: res.msg || '用户信息获取失败',
        icon: 'none',
      })
    }
  })
}

// 获取用户当前正在浏览的小区的信息
const getCurrentCommunity = () => {
  CommunityApi.getCommunityDetail().then((res) => {
    console.log(res)
    if (res.code === 200) {
      store.commit('setCurrentCommunity', res.data)
    } else {
      uni.showToast({
        title: res.msg || '用户信息获取失败',
        icon: 'none',
      })
    }
  })
}

export default {
  getCommunityList,
  getCurrentCommunity,
}
