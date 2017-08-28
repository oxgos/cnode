<template>
  <div class="header">
  	<div class="title" v-if="headerStatus">
  		<div class="menu" @click="showM"></div>
  		<div class="logo"><img src="static/img/cnodejs_light.svg" alt="" width="120" height="28"></div>
      <div class="new-topic" @click='writeTopic'></div>
  	</div>
    <div class="subTitle" v-else>
      <img src="static/img/back.svg" alt="" width="30" height="30" @click="goBack">
      <h3>{{ subTitle }}</h3>
    </div>
  	<div class="nav" v-show="navStatus">
  		<ul class="nav-wrapper">
  			<li><router-link to="/" :class="{active: changeTab === '/'}">全部</router-link></li>
  			<li><router-link to="/good" :class="{active: changeTab === '/good'}">精华</router-link></li>
  			<li><router-link to="/share" :class="{active: changeTab === '/share'}">分享</router-link></li>
  			<li><router-link to="/ask" :class="{active: changeTab === '/ask'}">问答</router-link></li>
  			<li><router-link to="/job" :class="{active: changeTab === '/job'}">招聘</router-link></li>
  			<li><router-link to="/dev" :class="{active: changeTab === '/dev'}">测试</router-link></li>
  		</ul>
  	</div>
  	<transition name="move">
  		<div class="menu-wrapper" v-show="menuStatus">
  			<div class="avatar">
  				<figure @click="login">
  					<img :src="userAvatar?userAvatar:avatar" width="100" height="100" alt="">
  					<p>{{ loginName? loginName : '登陆/Login' }}</p>
  				</figure>
  			</div>
  			<ul>
  				<li class="menu-option">我的消息</li>
          <li class="menu-option">关于</li>
          <li class="menu-option" @click="logout">退出登陆</li>
  			</ul>
  		</div>	
  	</transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getToken, removeToken } from 'common/js/cookie.js'

export default {
  name: 'header',
  data () {
    return {
      tab: null,
      avatar: 'static/img/avatar.png'
    }
  },
  computed: {
    subTitle () {
      switch (this.$route.name) {
        case 'topicDetail':
          return '话题详情'
        case 'login':
          return '登陆页面'
      }
    },
    changeTab () {
      this.tab = this.$route.path
      return this.tab
    },
    ...mapState([
      'userAvatar',
      'loginName',
      'menuStatus',
      'navStatus',
      'headerStatus'
    ])
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    writeTopic () {
      this.$router.push('/edit')
    },
    showM () {
      if (getToken()) {
        this.$store.dispatch('SET_TOKEN', getToken())
      }
      this.$store.dispatch('CHANGE_MENUSTATUS')
    },
    login () {
      this.$store.dispatch('CHANGE_MENUSTATUS')
      this.$router.push('/login')
    },
    logout () {
      removeToken()
      this.$store.dispatch('SET_USERAVATAR', null)
      this.$store.dispatch('SET_LOGINNAME', null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
	@import './header.styl'
</style>
