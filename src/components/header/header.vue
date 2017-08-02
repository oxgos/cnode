<template>
  <div class="header">
	<div class="title">
		<span class="menu"></span>
		<img src="static/img/cnodejs_light.svg" alt="" width="120" height="28">
	</div>
	<div class="nav">
		<ul class="nav-wrapper">
			<li><router-link to="/">全部</router-link></li>
			<li><router-link to="/good">精华</router-link></li>
			<li><router-link to="/share">分享</router-link></li>
			<li><router-link to="/ask">问答</router-link></li>
			<li><router-link to="/job">招聘</router-link></li>
			<li><router-link to="/dev">测试</router-link></li>
		</ul>
	</div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      classify: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
	@import './header.styl'
</style>
