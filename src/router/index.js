import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import share from '@/components/share/share'
import good from '@/components/good/good'
import ask from '@/components/ask/ask'
import job from '@/components/job/job'
import dev from '@/components/dev/dev'
import login from '@/components/login/login'

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
      path: '/ask',
      name: 'ask',
      component: ask
    },
    {
      path: '/job',
      name: 'job',
      component: job
    },
    {
      path: '/dev',
      name: 'dev',
      component: dev
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
