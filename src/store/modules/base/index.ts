import mutations from './mutations'
import actions from './actions'
const all = {
  state: {
    /**
     * 全局loading框，使用方式（主动关闭）：
     * this.$commit('loading', '加载框文字内容');
     * this.$commit('loading', false);
     */
    loading: null,
    online: true, // 登录状态，
    user: {}, // 储存用户信息
    windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
    windowWidth: window.screen.width
  },
  getters: {
    windowHeight: (state: Type.Object) => {
      return state.windowHeight
    },
    windowWidth: (state: Type.Object) => {
      return state.windowWidth
    },
    online: (state: Type.Object) => {
      return state.online
    },
    user: (state: Type.Object) => {
      return state.user
    }
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  },
}
export default all
