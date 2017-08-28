// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/index'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if ((to.path === '/') || (to.path === '/good') || (to.path === '/share') || (to.path === '/ask') || (to.path === '/job') || (to.path === '/dev')) {
    store.dispatch('UPDATA_HEADER', true)
    store.dispatch('UPDATA_NAV', true)
  } else {
    store.dispatch('UPDATA_HEADER', false)
    store.dispatch('UPDATA_NAV', false)
  }
  if (to.meta.requireAuth) {
    console.log(store.getters.token)
    if (!store.getters.token) {
      if (from.name === 'login') {
        alert('请先登陆')
        next('/')
      } else {
        alert('请先登陆')
        next('/login')
      }
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
