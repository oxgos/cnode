<template>
  <div class="header">
	<div class="title">
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
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      tab: null
    }
  },
  computed: {
    changeTab () {
      this.tab = this.$route.path
      return this.tab
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
	@import './header.styl'
</style>
