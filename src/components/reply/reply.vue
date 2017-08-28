<template>
  <div>
    <transition name="move">
      <div class="reply" v-show="replyStatus">
        <h4 class="reply-count">
          <img src="static/img/goback.svg" alt="" @click.stop.prevent="goback">
          <span>{{ replies.length }}个回复</span>
        </h4>
        <div class="main" ref="main">
          <ul>
            <li class="reply-line" v-for="(reply, index) in replies">
              <div class="reply-top">
                <div class="replay-author">
                  <img :src="reply.author.avatar_url" alt="">
                </div>
                <div class="author-info">
                  <div class="author-id">{{ reply.author.loginname }}</div>
                  <div class="creates_at">{{ reply.create_at | agoTime }}</div>
                </div>
                <div class="up" :class="{ active: reply.is_uped }" @click.stop.prevent="isUp($event, index, reply.id)">
                  {{ reply.ups.length }}
                  <span @click.stop.prevent="replyAuthor($event, reply.author.loginname, reply.id)">
                    <img src="./reply.png" alt="" width="12"
                  height="12">
                  </span>
                </div>
              </div>
              <div class="reply-bottom" v-html="reply.content"></div>
            </li>
          </ul>
        </div>
        <footer class="comments">
          <form action="#">
            <div class="form-group" v-if="authorName">
              <label for="comment2"></label>
              <input id="comment2" type="text" placeholder="评论" v-model="msg">
              <div class="btn2" @click="submitComment">
                <span>@{{ authorName }}</span>
              </div>
            </div>
            <div class="form-group" v-else>
              <label for="comment"></label>
              <input id="comment" type="text" placeholder="评论" v-model="msg">
              <div class="btn1" @click="submitComment"></div>
            </div>
          </form>
        </footer>
      </div>
    </transition>
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
  	},
    topic_id: {
      type: String
    }
  },
  data () {
    return {
      msg: '',
      authorName: '',
      reply_id: '',
      replyStatus: false
    }
  },
  methods: {
    showReply () {
      this.replyStatus = !this.replyStatus
      this.$nextTick(() => {
        if (this.replyScroll) {
          this.replyScroll.refresh()
        } else {
          this.replyScroll = new BScroll(this.$refs.main, {
            click: true
          })
        }
      })
    },
    replyAuthor (e, name, id) {
      if (!e._constructed) {
          return
      }
      if (this.authorName === name) {
        this.authorName = ''
        this.reply_id = ''
      } else {
        this.authorName = name
        this.reply_id = id
      }
    },
    isUp (e, index, id) {
      if (!e._constructed) return
      if (!this.$store.getters.token) {
        alert('请登录')
        return
      } else {
        this.$ajax.post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
        accesstoken: this.$store.getters.token
      })
        .then(res => {
          if (res.data.action === 'up') {
            this.replies[index].is_uped = true
            this.replies[index].ups.length++
          } else {
            this.replies[index].is_uped = false
            this.replies[index].ups.length--
          }
        })
      }
    },
    submitComment () {
      if (!this.$store.getters.token) {
        alert('请登录')
        return
      } else {
        if (!this.msg) {
          alert('内容不能为空')
        } else {
              this.$ajax.post(`https://cnodejs.org/api/v1/topic/${this.topic_id}/replies`, {
                accesstoken: this.$store.getters.token,
                content: this.msg,
                reply_id: this.reply_id
            })
              .then(res => {
                if (res.data.success) {
                  alert('评论成功')
                } else {
                  alert('评论失败')
                }
              })
          }
        }
    },
    goback () {
      this.replyStatus = false
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
    top 0
    left 0
    bottom 0
    width 100%
    padding 5px 5px
    background #fff
    box-sizing border-box
    z-index 1650
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all 0.35s ease-out
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .reply-count
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
      .reply-line
        margin 5px 0
        border 1px solid #eee
        box-sizing border-box
        .reply-top
          position relative
          .replay-author
            display inline-block
            margin-right 5px
            vertical-align top
            img
              width 30px
              height 30px
          .author-info
            display inline-block
            font-size 12px
            vertical-align top
          .up
            position absolute
            top 5px
            right 10px
            height 12px
            padding-left 18px
            font-size 12px
            line-height 12px
            color #666
            background-image url('./good.png')
            background-repeat no-repeat
            background-size 12px 12px
            box-sizing border-box
            &.active
              background-image url('./good-active.png')
            span
              vertical-align middle
              margin-left 5px
        .reply-bottom
          width 100%
          font-size 12px
          .markdown-text 
            p
              text-align justify
              margin 5px 0
            img
              width 100%
            code
              white-space normal
    .comments
      position fixed
      left 0
      bottom 0
      width 100%
      height 35px
      padding 2px 2px
      background #444
      z-index 1700
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
        .btn1
          flex 0 0 38px
          background url('./write.png') no-repeat 4px 0
          background-size 34px 34px
        .btn2
          flex 0 0 100px
          background url('./write.png') no-repeat 66px 0
          background-size 34px 34px
          span
            display inline-block
            width 60px
            height 35px
            padding 0 2px
            line-height 35px
            font-size 12px
            color #fff
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
</style>