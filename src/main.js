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
  if (store.getters.token) {
    if (to.path === '/edit') {
      console.log(1)
      store.dispatch('SET_TOKEN', store.getters.token)
    }
  } else {
    if (to.path === '/edit') {
      next('/login')
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
