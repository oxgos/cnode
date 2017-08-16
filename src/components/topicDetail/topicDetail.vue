<template>
  <div class="topicDetail">
    <div class="back">
      <img src="static/img/back.svg" alt="" width="30" height="30" @click="back">
      <span>cnode社区</span>
    </div>
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
              <span class="reply">评论{{ reply_count }}个</span>
              <span class="visit">{{ visit_count }}次浏览</span>
            </div>
            <div class="fn">
              <span class="comment"></span>
              <span class="collect"></span>
            </div>
          </div>
        </div>
        <div class="content" v-html="content"></div>
      </div>
    </div>
      
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { preloadImages } from 'common/js/preloadImages2.js'

export default {
  name: 'topicDetail',
  data () {
    return {
      author: null,
      avatar_url: null,
      is_collect: null,
      good: null,
      tab: null,
      visit_count: null,
      reply_count: null,
      content: null// 页面所有数据
    }
  },
  beforeRouteEnter (to, from, next) {
    let id = to.params.id.slice(1)
    next(vm => {
      vm.$ajax.get(`https://cnodejs.org/api/v1/topic/${id}`)
        .then((res) => {
          vm.author = res.data.data.author.loginname
          vm.avatar_url = res.data.data.author.avatar_url
          vm.is_collect = res.data.data.is_collect
          vm.visit_count = res.data.data.visit_count
          vm.reply_count = res.data.data.reply_count
          vm.content = res.data.data.content
          vm.good = res.data.data.good
          vm.tab = res.data.data.tab
          preloadImages(vm.content)
            .then(() => {
              vm.contentScroll = new BScroll(vm.$refs.content, {})
            })
        })
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
      this.$store.dispatch('UPDATA_HEADER', true)
      this.content = null
    },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .topicDetail
    position absolute
    top 0
    left 0
    bottom 0
    width 100%
    .back
      width 100%
      height 40px
      padding-top 5px
      background #444
      box-sizing border-box
      img
        display inline-block
        vertical-align top
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
      top 40px
      left 0
      bottom 0
      width 100%
      padding 10px 5px
      background #fff
      overflow hidden
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
            .reply
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
</style>