import { createStore } from 'vuex'

const setLocalUserMsg = (state) => {
  const { userMsg } = state
  const userMsgString = JSON.stringify(userMsg) || ''
  uni.setStorageSync('user_msg', userMsgString)
}

const getLocalUserMsg = (): IuserMsg => {
  const userMsg = uni.getStorageSync('user_msg')
  return userMsg ? JSON.parse(userMsg) : {}
}

interface IuserInfo {
  age?: number | null
  email?: string | null
  gender?: string | null
  name?: string | null
  nickName?: string | null
  phone?: string | null
}

interface IuserMsg {
  userToken?: string
  userInfo?: IuserInfo
}

const store = createStore({
  state: {
    //存放用户信息
    userMsg: getLocalUserMsg(),
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
      setLocalUserMsg(state)
    },
    // 修改用户信息
    setUserInfo(state, data: IuserInfo) {
      state.userMsg.userInfo = data
      setLocalUserMsg(state)
    },
  },
  actions: {},
})

export default store
