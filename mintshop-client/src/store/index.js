/*
vuex最核心的管理对象store
组装模块并导出 store 的地方
 */
// 首先引入Vue及Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 引入四个基本模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 一定要声明使用插件
Vue.use(Vuex)

// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
