import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import share from '@/components/share/share'
import good from '@/components/good/good'
import ask from '@/components/ask/ask'
import job from '@/components/job/job'
import dev from '@/components/dev/dev'
import login from '@/components/login/login'
import topicDetail from '@/components/topicDetail/topicDetail'
import edit from '@/components/edit/edit'
import userinfo from '@/components/userinfo/userinfo'

// const Home = resolve => require(['@/components/home/Home'], resolve)
// const share = resolve => require(['@/components/share/share'], resolve)
// const good = resolve => require(['@/components/good/good'], resolve)
// const ask = resolve => require(['@/components/ask/ask'], resolve)
// const job = resolve => require(['@/components/job/job'], resolve)
// const dev = resolve => require(['@/components/dev/dev'], resolve)
// const login = resolve => require(['@/components/login/login'], resolve)
// const topicDetail = resolve => require(['@/components/topicDetail/topicDetail'], resolve)
// const edit = resolve => require(['@/components/edit/edit'], resolve)
// const userinfo = resolve => require(['@/components/userinfo/userinfo'], resolve)

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
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/topicDetail/:id',
      name: 'topicDetail',
      component: topicDetail
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit,
      // 是否需要登陆权限
      meta: {
        requireAuth: true
      }
    }
  ]
})
