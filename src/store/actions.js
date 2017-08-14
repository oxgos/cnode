import { setToken } from '../common/js/cookie.js'
import fetch from '../common/js/fetch.js'

export const UPDATA_HEADER = ({ commit }) => commit('UPDATA_HEADER')

export const UPDATA_AJAXLOADING = ({ commit }) => commit('UPDATA_AJAXLOADING')

export const UPDATA_AJAXLOADING_ASYNC = ({ commit }) => {
  setTimeout(() => {
    commit('UPDATA_AJAXLOADING')
  }, 1500)
}

export const SET_TOKEN = ({ commit }, token) => {
  fetch.post('https://cnodejs.org/api/v1/accesstoken', {
    accesstoken: token
  }).then(res => {
    if (res.data.success) {
      setToken(token)
      commit('SET_TOKEN', token)
      commit('SET_USERAVATAR', res.data.avatar_url)
      commit('SET_LOGINNAME', res.data.loginname)
    }
  })
}

export const SET_USERAVATAR = ({ commit }, val) => {
  commit('SET_USERAVATAR', val)
}

export const SET_LOGINNAME = ({ commit }, val) => {
  commit('SET_LOGINNAME', val)
}

export const CHANGE_MENUSTATUS = ({ commit }) => {
  commit('CHANGE_MENUSTATUS')
}
