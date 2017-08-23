<template>
  <div class="reply">
	<h5 class="replyCount">{{ replies.length }}个回复</h5>
	<div class="main">
		<ul>
			<li class="replyLine" v-for="reply in replies">
				<div class="replayAuthor">
					<img :src="reply.author.avatar_url" alt="">
				</div>
				<div class="authorInfo">
					<div class="authorId">{{ reply.author.loginname }}</div>
					<div class="creates_at">{{ reply.create_at }}</div>
				</div>
			</li>
		</ul>
	</div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'

export default {
  name: 'reply',
  props: {
  	replies: {
       type: Array
  	}
  },
  mounted () {
    console.log(this.replies)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .reply
  	position absolute
  	top 40px
  	left 0
  	bottom 0
  	width 100%
  	padding 10px 5px
  	overflow hidden
  	background #fff
  	box-sizing border-box
  	.replyCount
  		background #eee
</style>