<template>
  <div class="header">
	<div class="title" @click="showM">
		<div class="menu"></div>
		<h1><img src="static/img/cnodejs_light.svg" alt="" width="120" height="28"></h1>
	</div>
	<div class="nav">
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
		<div class="menu-wrapper" v-show="showMenu">
			<div class="avatar">
				<figure @click="login">
					<img :src="userAvatar?userAvatar:avatar" width="100" height="100" alt="">
					<p>{{ loginName? loginName : '登陆/Login' }}</p>
				</figure>
			</div>
			<ul>
				<li class="menu-option" v-for="option in options">{{ option }}</li>
			</ul>
		</div>	
	</transition>
	<div class="mask" v-show="showMenu"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'header',
  data () {
    return {
      tab: null,
      options: ['我的消息', '关于'],
      showMenu: false,
      avatar: 'static/img/avatar.png'
    }
  },
  computed: {
    changeTab () {
      this.tab = this.$route.path
      return this.tab
    },
    ...mapState([
      'userAvatar',
      'loginName'
    ])
  },
  methods: {
    showM () {
      this.showMenu = !this.showMenu
    },
    login () {
      this.showMenu = !this.showMenu
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
	@import './header.styl'
</style>
