export const UPDATA_AJAXLOADING = state => {
  state.ajaxLoading = !state.ajaxLoading
}
export const UPDATA_TOPICCONTENT = (state, val) => {
  state.topicContent = val
}
export const SET_TOKEN = (state, token) => {
  state.token = token
}
export const SET_USERAVATAR = (state, userAvatar) => {
  state.userAvatar = userAvatar
}
export const SET_LOGINNAME = (state, loginName) => {
  state.loginName = loginName
}
