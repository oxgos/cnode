<template>
  <div class="reply">
  	<h4 class="replyCount">
      <img src="static/img/goback.svg" alt="" @click="goback">
      <span>{{ replies.length }}个回复</span>
    </h4>
  	<div class="main" ref="main">
  		<ul>
  			<li class="replyLine" v-for="reply in replies">
          <div class="replyTop">
            <div class="replayAuthor">
              <img :src="reply.author.avatar_url" alt="">
            </div>
            <div class="authorInfo">
              <div class="authorId">{{ reply.author.loginname }}</div>
              <div class="creates_at">{{ reply.create_at }}</div>
            </div>
          </div>
  				<div class="replyBottom" v-html="reply.content"></div>
  			</li>
  		</ul>
  	</div>
    <footer class="comment"></footer>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'reply',
  props: {
  	replies: {
       type: Array
  	}
  },
  mounted () {
    // console.log(this.replies)
    this.$nextTick(() => {
      this.replyScroll = new BScroll(this.$refs.main, {
        click: true
      })
    })
  },
  methods: {
    goback () {
      this.$store.dispatch('UPDATA_REPLYSTATUS')
    }
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
    padding 5px 5px
    background #fff
    box-sizing border-box
    z-index 1300
    .replyCount
      line-height 20px
      background #ccc
      img
        width 18px
        height 18px
        vertical-align middle
      span
        color #333
        font-size 14px
        vertical-align middle
    .main
      position absolute
      top 30px
      left 5px
      right 5px
      bottom 35px
      padding-bottom 35px
      overflow hidden
      .replyLine
        margin 5px 0
        border 1px solid #eee
        box-sizing border-box
        .replyTop
          .replayAuthor
            display inline-block
            vertical-align top
            img
              width 30px
              height 30px
          .authorInfo
            display inline-block
            font-size 12px
            vertical-align top
        .replyBottom
          width 100%
          font-size 12px
    .comment
      position fixed
      left 0
      bottom 0
      width 100%
      height 35px
      background #fff  
</style>