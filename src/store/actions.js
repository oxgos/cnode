export const UPDATA_AJAXLOADING = ({ commit }) => commit('UPDATA_AJAXLOADING')
export const UPDATA_AJAXLOADING_ASYNC = ({ commit }) => {
  setTimeout(() => {
    commit('UPDATA_AJAXLOADING')
  }, 1500)
}
export const UPDATA_TOPICCONTENT = ({ commit }, val) => commit('UPDATA_TOPICCONTENT', val)
