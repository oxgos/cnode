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
			<span data-i="0" :class="{active: index === 0}">最近回复</span>
			<span data-i="1" :class="{active: index === 1}">我的发布</span>
			<span data-i="2" :class="{active: index === 2}">话题收藏</span>
    </div>
    <div class="userinfo-content" ref="content">
			<ul class="content-wrapper" v-if="index === 0">
				<li class="row" v-for="reply in recent_replies">
					<img :src="reply.author.avatar_url" alt="" width="32" height="32">
					<div class="row-right">
						<p>{{ reply.title }}</p>
						<p>{{ reply.author.loginname }}</p>
					</div>
				</li>
			</ul>
			<ul class="content-wrapper" v-else-if="index === 1">
				<li class="row" v-for="topic in recent_topics">
					<img :src="topic.author.avatar_url" alt="" width="32" height="32">
					<div class="row-right">
						<p>{{ topic.title }}</p>
						<p>{{ topic.last_reply_at | formatDate}}</p>
					</div>
				</li>
			</ul>
			<ul class="content-wrapper" v-else>
				<li class="row" v-for="collect in collection">
					<img :src="collect.author.avatar_url" alt="" width="32" height="32">
					<div class="row-right">
						<p>{{ collect.title }}</p>
						<p>{{ collect.author.loginname }}</p>
					</div>
				</li>
			</ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { userinfoAjax, usercollectAjax } from 'common/js/dataAjax.js'
export default {
  name: 'userinfo',
  data () {
  	return {
  		userdata: null, // 所有用户数据
  		recent_replies: [], // 最近回复
  		recent_topics: [], // 最新发布
  		collection: [], // 话题收藏
  		index: 0 // 选项卡索引
  	}
  },
  deactivated () {
    // 完全销毁一个实例,销毁后才会再次触发created周期
    this.$destroy()
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
  			vm.$nextTick(() => {
  				vm.userinfo = new BScroll(this.$refs.content, {
  					click: true
  				})
  			})
  		}))
  },
  methods: {
  	// 选项卡的转换
  	changeTab (e) {
  		if (e.target.nodeName === 'SPAN') {
  			this.index = parseInt(e.target.getAttribute('data-i'))
  			this.$nextTick(() => {
  				this.userinfo.refresh()
  			})
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
    	color #fff
    	background url('./background_2.jpg') no-repeat
    	background-size 100% 100%
    	box-sizing border-box
    	.info
    		width 100%
    		.info-wrapper
    			dispaly table-cell
	    		text-align center
	    		vertical-align middle
	    		font-size 14px
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
	    		font-size 12px
	    	.score
	    		float right
	    		color #80bd01
	.userinfo-nav
		display flex
		justify-content space-around
		height 30px
		line-height 30px
		color #fff
		font-size 14px
		background #1F2D3D
		.active
			border-bottom 4px solid #80bd01
	.userinfo-content
		position absolute
		width 100%
		top 230px
		bottom 0
		overflow hidden
		.row
			display flex
			width 100%
			padding 8px 5px
			border-bottom 1px dotted #99A9BF
			img
				flex 0 0 32px
				border-radius 50%
				margin-right 5px
			.row-right
				flex 1
				width 100%
				font-size 12px
				line-height 16px
				p
					max-width 330px
					white-space nowrap
					text-overflow ellipsis
					overflow hidden									
</style>