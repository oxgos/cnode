import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations.js'
import * as actions from './actions.js'

Vue.use(Vuex)

const state = {
  'ajaxLoading': false
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
