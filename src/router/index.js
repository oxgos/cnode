import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import share from '@/components/share/share'
import good from '@/components/good/good'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/good',
      name: 'good',
      component: good
    },
    {
      path: '/share',
      name: 'share',
      component: share
    },
    {
      path: '/ask'
    },
    {
      path: '/job'
    },
    {
      path: '/dev'
    }
  ]
})
