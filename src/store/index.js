import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'
import { getToken } from '../common/js/cookie.js'

Vue.use(Vuex)

const state = {
  showHeader: true,
  ajaxLoading: false,
  token: getToken(),
  userAvatar: null,
  loginName: null
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
