export default {
  namespaced: true,
  state: {
    is_show: false,
    category_id: 0,
  },
  getters: {
    getIsShow(state) {
      return state.is_show
    },
    getCategoryId(state) {
      return state.category_id
    },
  },
  mutations: {
    setIsShow(state, status) {
      state.is_show = status
    },
    setCategoryId(state, value) {
      state.category_id = value
    },
  },
  actions: { // 使用解构赋值，参数列表 {commit, state}
    setIsShowValue({commit, state}, status) {
      // commit 调用 mutations 的方法
      commit('setIsShow', status)
    },
    setCategoryIdValue({commit, state}, value) {
      // commit 调用 mutations 的方法
      commit('setCategoryId', value)
    },
  }
}
