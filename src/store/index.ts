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

const getLocalCommunityId = () => {
  const userMsg = uni.getStorageSync('community_id')
  return userMsg ? JSON.parse(userMsg) : 1
}

// 用户信息
interface IuserInfo {
  age?: number | null
  email?: string | null
  gender?: string | null
  name?: string | null
  nickName?: string | null
  phone?: string | null
}

// 用户所属的所有小区
interface IcommunityList {
  communityId: number
  location: string
  name: string
  addressDetail: string
}
interface IuserMsg {
  userToken?: string
  userInfo?: IuserInfo
  communityList?: IcommunityList[]
}

const store = createStore({
  state: {
    //存放用户信息
    userMsg: getLocalUserMsg(),
    communityId: getLocalCommunityId(),
  },
  getters: {
    getUserToken(state) {
      return state.userMsg.userToken || ''
    },
  },
  mutations: {
    // 修改 token
    setUserToken(state, userToken: string) {
      state.userMsg.userToken = userToken
      // 存入 localStorage 中
      setLocalMsg(state.userMsg, '')
    },
    // 修改用户信息
    setUserInfo(state, data: IuserInfo) {
      state.userMsg.userInfo = data
      setLocalMsg(state.userMsg, 'user_msg')
    },
    // 修改用户所属小区信息
    setCommunityList(state, data) {
      state.userMsg.communityList = data
      setLocalMsg(state.userMsg, 'user_msg')
    },
    // 切换小区
    changeComunityList(state, communityId: number) {
      state.communityId = communityId
      setLocalMsg(state.userMsg, 'community_id')
    },
  },
  actions: {},
})

export default store
