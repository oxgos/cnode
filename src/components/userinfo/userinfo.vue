<template>
  <div class="userinfo" v-if="userdata">
    <div class="userinfo-head">
		<div class="info">
			<div class="info-wrapper">
				<img :src="userdata.avatar_url" alt="" width="110" height="110">
				<p>{{ userdata.loginname }}</p>
				<p>github.com/{{ userdata.githubUsername }}</p>
			</div>
		</div>
		<div class="others">
			<span class="register-time">注册时间:{{ userdata.create_at | formatDate}}</span>
			<span class="score">score:{{ userdata.score }}</span>
		</div>
    </div>
    <div class="userinfo-nav" @click="changeTab($event)">
		<div data-i="0" :class="{active: index === 0}">最近回复</div>
		<div data-i="1" :class="{active: index === 1}">我的发布</div>
		<div data-i="2" :class="{active: index === 2}">话题收藏</div>
    </div>
    <div class="userinfo-content">
		<ul v-show="index === 0">
			<li v-for="reply in recent_replies">
				<img :src="reply.author.avatar_url" alt="" width="32" height="32">
				<div>
					<p>{{ reply.title }}</p>
					<p>{{ reply.author.loginname }}</p>
				</div>
			</li>
		</ul>
		<ul v-show="index === 1">
			<li v-for="topic in recent_topics">
				<p>{{ topic.title }}</p>
				<p>{{ topic.last_reply_at }}</p>
			</li>
		</ul>
		<ul v-show="index === 2">
			<li v-for="collect in collection">
				<img :src="collect.author.avatar_url" alt="" width="32" height="32">
				<div>
					<p>{{ collect.title }}</p>
					<p>{{ collect.author.loginname }}</p>
				</div>
			</li>
		</ul>
    </div>
  </div>
</template>

<script>
import { userinfoAjax, usercollectAjax } from 'common/js/dataAjax.js'
export default {
  name: 'userinfo',
  data () {
  	return {
  		userdata: null, // 所有用户数据
  		recent_replies: [], // 最近回复
  		recent_topics: [], // 最新发布
  		collection: [], // 话题收藏
  		index: 0
  	}
  },
  created () {
  	let vm = this
  	let loginName = vm.$store.getters.loginName
  	vm.$ajax.all([userinfoAjax(vm, loginName), usercollectAjax(vm, loginName)])
  		.then(vm.$ajax.spread((acct, perms) => {
  			vm.userdata = acct.data.data
  			vm.recent_replies = vm.userdata.recent_replies
  			vm.recent_topics = vm.userdata.recent_topics
  			vm.collection = perms.data.data
  		}))
  },
  methods: {
  	changeTab (e) {
  		if (e.target.nodeName === 'DIV') {
  			this.index = parseInt(e.target.getAttribute('data-i'))
  		}
  	}
  },
  filters: {
  	formatDate (time) {
  		return time.split('T')[0]
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .userinfo
    position absolute
    top 40px
    left 0
    bottom 0
    width 100%
    background #eee
    .userinfo-head
    	width 100%
    	padding 10px 10px 5px 10px
    	color #FFF
    	background rgba(0, 0, 0, .8)
    	box-sizing border-box
    	.info
    		width 100%
    		.info-wrapper
    			dispaly table-cell
	    		text-align center
	    		vertical-align middle
	    		font-size 16px
	    		img
	    			border-radius 50%
	    		p
	    			line-height 22px
	    .others
	    	font-size 14px
	    	line-height 26px
	    	&::after
	    		display block
	    		content ''
	    		clear both
	    	.register-time
	    		float left
	    	.score
	    		float right
	    		color #80bd01
	.userinfo-nav
		display flex
		justify-content space-around
		height 40px
		line-height 40px
		color #fff
		background #000
		.active
			border-bottom 4px solid #80bd01				
</style>