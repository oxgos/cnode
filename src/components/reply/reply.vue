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
              <div class="creates_at">{{ reply.create_at | agoTime }}</div>
            </div>
            <div class="up"></div>
          </div>
  				<div class="replyBottom" v-html="reply.content"></div>
  			</li>
  		</ul>
  	</div>
    <footer class="comments">
      <form action="#">
        <div class="form-group">
          <label for="comment"></label>
          <input id="comment" type="text" placeholder="评论">
          <div class="btn"></div>
        </div>  
      </form>
    </footer>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { formatTime } from 'common/js/formatTime.js'

export default {
  name: 'reply',
  props: {
  	replies: {
       type: Array
  	}
  },
  mounted () {
    // console.log(this.replies)
    if (this.replyScroll) {
      this.replyScroll.refresh()
    } else {
      this.replyScroll = new BScroll(this.$refs.main, {
        click: true
      })
    }
  },
  methods: {
    goback () {
      this.$store.dispatch('UPDATA_REPLYSTATUS')
    }
  },
  filters: {
    agoTime (time) {
      return formatTime(time)
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
    z-index 1650
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
          position relative
          .replayAuthor
            display inline-block
            margin-right 5px
            vertical-align top
            img
              width 30px
              height 30px
          .authorInfo
            display inline-block
            font-size 12px
            vertical-align top
          .up
            position absolute
            top 5px
            right 10px
            width 12px
            height 12px
            background-image url('./good.png')
            background-repeat no-repeat
            background-size 12px 12px
            &.active
              background-image url('./good-active.png')
        .replyBottom
          width 100%
          font-size 12px
    .comments
      position fixed
      left 0
      bottom 0
      width 100%
      height 35px
      padding 2px 2px
      background #444
      box-sizing border-box
      .form-group
        display flex
        height 35px
        input
          flex 1
          height 31px
          line-height 31px
          font-size 18px
          padding-left 5px
          border none
          outline none
          box-sizing border-box
        .btn
          flex 0 0 50px
          background url('./write.png') no-repeat 9px 0
          background-size 34px 34px
</style>