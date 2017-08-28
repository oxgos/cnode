export const UPDATA_HEADER = (state, val) => {
	state.headerStatus = val
}
export const UPDATA_NAV = (state, val) => {
	state.navStatus = val
}
export const UPDATA_AJAXLOADING = state => {
  state.ajaxLoading = !state.ajaxLoading
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
export const CHANGE_MENUSTATUS = (state) => {
  state.menuStatus = !state.menuStatus
}
export const SHOW_BACKTOP = (state, bool) => {
  state.showBacktop = bool
}
