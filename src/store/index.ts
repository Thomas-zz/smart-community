import { createStore } from 'vuex'

const setLocalMsg = (stateItem, itemName: string) => {
  const userMsg = stateItem
  const userMsgString = JSON.stringify(userMsg) || ''
  uni.setStorageSync(itemName, userMsgString)
}

const getLocalUserMsg = (): IuserMsg => {
  const userMsg = uni.getStorageSync('user_msg')
  return userMsg ? JSON.parse(userMsg) : {}
}

const getLocalCommunityMsg = (): IcommunityMsg => {
  const communityMsg = uni.getStorageSync('community_msg')
  return communityMsg ? JSON.parse(communityMsg) : {}
}

// 用户个人信息
interface IuserInfo {
  age?: number | null
  email?: string | null
  gender?: string | null
  name?: string | null
  nickName?: string | null
  phone?: string | null
}
// 用户相关的所有信息
interface IuserMsg {
  userToken?: string
  userInfo?: IuserInfo
}

// 用户所属的小区列表
interface IcommunityList {
  communityId: number
  location: string
  name: string
  addressDetail: string
}

interface IcommunityMsg {
  currentCommunity?: {
    addressDetail: string
    location: string
    name: string
  } | null
  communityList?: IcommunityList[]
}

const store = createStore({
  state: {
    //存放用户信息
    userMsg: getLocalUserMsg(),
    communityMsg: getLocalCommunityMsg(),
  },
  getters: {
    getUserToken(state) {
      return state.userMsg.userToken || ''
    },
    getUserName(state) {
      return state.userMsg.userInfo?.name
    },
    getUserGender(state) {
      return state.userMsg.userInfo?.gender
    },
  },
  mutations: {
    // 清空本地缓存
    cleanState(state) {
      state.userMsg = {}
      state.communityMsg = {}
      setLocalMsg('', 'user_msg')
      setLocalMsg('', 'community_msg')
    },
    // 修改 token
    setUserToken(state, userToken: string) {
      state.userMsg.userToken = userToken
      // 存入 localStorage 中
      setLocalMsg(state.userMsg, 'user_msg')
    },
    // 修改用户信息
    setUserInfo(state, data: IuserInfo) {
      state.userMsg.userInfo = data
      setLocalMsg(state.userMsg, 'user_msg')
    },
    // 修改用户所属小区列表
    setCommunityList(state, data) {
      state.communityMsg.communityList = data
      setLocalMsg(state.communityMsg, 'community_msg')
    },
    // 修改用户当前所属小区信息
    setCurrentCommunity(state, data) {
      state.communityMsg.currentCommunity = data
      setLocalMsg(state.communityMsg, 'community_msg')
    },
  },
  actions: {},
})

export default store
