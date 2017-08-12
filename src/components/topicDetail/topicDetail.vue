<template>
  <div class="topicDetail">
    <div class="back">
      <img src="static/img/back.svg" alt="" width="30" height="30" @click="back">
      <span>cnode社区</span>
    </div>
    <div class="content" v-html="content" ref="content"></div>  
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { preloadImages } from 'common/js/preloadImages2.js'

export default {
  name: 'topicDetail',
  data () {
    return {
      content: null// 页面所有数据
    }
  },
  beforeRouteEnter (to, from, next) {
    let id = to.params.id.slice(1)
    next(vm => {
      vm.$ajax.get(`https://cnodejs.org/api/v1/topic/${id}`)
        .then((res) => {
          vm.content = res.data.data.content
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
      this.$store.dispatch('UPDATA_HEADER')
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
        font-size 18px
        color #fff
        line-height 30px
        font-weight 600
        vertical-align top 
    .content
      position absolute
      top 40px
      left 0
      bottom 0
      width 100%
      background #fff
      overflow hidden
      .markdown-text
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