
const app = {
  // 全局状态
  state: {
    // 用户信息
    userInfo: {},
    isLogin: false,
    showLogin: false,
  },
  getters: {
  },
  mutations: {

    // 传入自定义参数
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setLoginState(state, isLogin) {
      state.isLogin = isLogin
    },
    setShowLogin(state, showLogin) {
      state.showLogin = showLogin
    }
  },

}
export default app
