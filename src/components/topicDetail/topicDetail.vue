<template>
  <div class="topic-detail">
    <div class="content-wrapper"  ref="content">
      <div>
        <div class="author">
          <div class="avatar">
            <img :src="avatar_url" alt="" width="40" height="40">
          </div>
          <div class="info">
            <div class="top">
              <span class="tab" :class="{good: good || tab}">{{ classify(good, tab) }}</span>
              <span class="name">{{ author }}</span>
            </div>
            <div class="bottom">
              <span class="detail-reply">评论{{ reply_count }}个</span>
              <span class="visit">{{ visit_count }}次浏览</span>
            </div>
            <div class="fn">
              <span class="comment" @click.stop.prevent="showReply($event)"></span>
              <span class="collect" :class="{'active':is_collect}" @click="collectTopic($event)"></span>
            </div>
          </div>
        </div>
        <div class="content" v-html="content"></div>
      </div>
    </div>
    <reply :replies="replies" :topic_id="topic_id" ref="reply"></reply>
    <div class="topic-mask" v-show="topicLoading">
      <div class="loading">
        <div class="loading-wrapper">
          <img src="static/img/loading.gif" alt="">
        </div>
      </div>
    </div>
    <backtop :scroll="scroll"></backtop>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { preloadImages } from 'common/js/preloadImages2.js'
import backtop from 'components/backtop/backtop'
import reply from 'components/reply/reply'

export default {
  name: 'topicDetail',
  data () {
    return {
      topic_id: '', // 话题id
      author: '', // 作者名字
      avatar_url: '', // 作者头像
      is_collect: false, // 是否收藏
      good: '', // 精华标签
      tab: '', // 分类标签
      visit_count: null, // 访问量
      reply_count: null, // 回复数量
      content: null, // 页面所有数据
      replies: [], // 所有回复的数据
      scroll: null,
      topicLoading: true
    }
  },
  // keep-alive钩子,不活动状态和活动状态activated
  deactivated () {
    // 完全销毁一个实例,销毁后才会再次触发created周期
    this.$destroy()
  },
  created () {
    let id = this.$route.params.id
    this.topicLoading = true
    this.$ajax.get(`https://cnodejs.org/api/v1/topic/${id}`, {
      params: {
        accesstoken: this.$store.getters.token
      }
    })
      .then((res) => {
        this.topic_id = id
        this.author = res.data.data.author.loginname
        this.avatar_url = res.data.data.author.avatar_url
        this.is_collect = res.data.data.is_collect
        this.visit_count = res.data.data.visit_count
        this.reply_count = res.data.data.reply_count
        this.content = res.data.data.content
        this.good = res.data.data.good
        this.tab = res.data.data.tab
        this.replies = res.data.data.replies
        preloadImages(this.content)
          .then(() => {
            this.topicLoading = false
            if (this.contentScroll) {
              this.contentScroll.refresh()
            } else {
              this.contentScroll = new BScroll(this.$refs.content, {
                probeType: 3,
                startX: 0,
                startY: 0,
                click: true
              })
            }
            this.scroll = this.contentScroll
            this.contentScroll.on('scroll', (pos) => {
              if (pos.y <= -200) {
                this.$store.dispatch('SHOW_BACKTOP', true)
              } else {
                this.$store.dispatch('SHOW_BACKTOP', false)
              }
            })
          })
      })
  },
  methods: {
    // 显示评论页
    showReply (e) {
      if (!e._constructed) {
          return
      }
      this.$refs.reply.showReply()
    },
    // 收藏主题
    collectTopic (e) {
      if (!e._constructed) {
          return
      }
      if (!this.$store.getters.token) {
        alert('请先登陆')
        // this.$router.push('/login')
      } else {
        if (this.is_collect === false) {
          this.$ajax.post('https://cnodejs.org/api/v1/topic_collect/collect', {
            accesstoken: this.$store.getters.token,
            topic_id: this.topic_id
          }).then(res => {
            if (res.data.success) {
              this.is_collect = true
            }
          })
        } else {
          this.$ajax.post('https://cnodejs.org/api/v1/topic_collect/de_collect', {
            accesstoken: this.$store.getters.token,
            topic_id: this.topic_id
          }).then(res => {
            if (res.data.success) {
              this.is_collect = false
            }
          })
        }
      }
    },
    // 文章标签分类
    classify (good, tab) {
        if (good) {
          return '精华'
        } else {
          switch (tab) {
            case 'share':
              return '分享'
            case 'ask':
              return '问答'
            case 'job':
              return '招聘'
            case 'dev':
              return '测试'
          }
        }
    }
  },
  components: {
    backtop,
    reply
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .topic-detail
    position absolute
    top 40px
    left 0
    width 100%
    height 100%
    .back
      span
        display inline-block
        height 30px
        font-size 22px
        color #fff
        line-height 30px
        font-weight 600
        vertical-align top
    .content-wrapper
      position absolute
      top 0
      left 0
      bottom 0
      width 100%
      padding 10px 5px
      background #fff
      overflow hidden
      z-index 1600
      box-sizing border-box  
      .author
        display flex
        padding 10px 5px
        box-sizing border-box
        .avatar
          flex 0 0 50px
          img
            border-radius 50%
        .info
          position relative
          flex 1
          font-size 16px
          color #666
          .top
            .tab
              display inline-block
              margin-right 5px
              width 40px
              text-align center
              border-radius 5px
              color #999
              background #e5e5e5
              &.good
                color #fff
                background #80bd01
            .name
              display inline-block
              font-weight 600
          .bottom
            .detail-reply
              margin-right 5px
          .fn
            position absolute
            right 5px
            top 5px
            .comment
              display inline-block
              width 25px
              height 25px
              margin-right 8px
              vertical-align top
              background url('../../../static/img/comment-active.png') no-repeat
              background-size 25px 25px 
            .collect
              display inline-block
              width 20px
              height 20px
              vertical-align middle
              background url('../../../static/img/collect.png') no-repeat
              background-size 20px 20px
              &.active
                background url('../../../static/img/collect-active.png') no-repeat
                background-size 20px 20px
      .content
        .markdown-text
          padding-bottom 30px
          h1
            font-size 20px
            margin 5px 0
            text-align center
          h2
            font-size 18px
            margin 3px 0  
          p
            text-align justify
            margin 5px 0
          img
            width 100%
          code
            white-space normal
    .topic-mask
      position absolute
      top 0
      left 0
      bottom 0
      width 100%
      background rgba(0, 0, 0, .3)
      z-index 1650
      .loading
        display table
        width 100%
        height 100%
        text-align center
        .loading-wrapper
          display table-cell
          width 200px
          height 200px
          vertical-align middle
          img
            width 120px
</style>