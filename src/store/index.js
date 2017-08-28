import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'
import { getToken } from '../common/js/cookie.js'

Vue.use(Vuex)

const state = {
  headerStatus: true,
  navStatus: true, // 首页头部显示隐藏状态
  menuStatus: false, // 菜单栏显示隐藏状态
  ajaxLoading: false, // Loading显示隐藏状态
  token: getToken(), // 登陆状态保存
  userAvatar: null, // 登陆用户头像
  loginName: null, // 登陆用户名称
  showBacktop: false // 返回头部显示隐藏
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
