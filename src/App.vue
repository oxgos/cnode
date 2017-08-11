<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <transition name="move">
      <div class="content" v-show="topicContent" v-html="topicContent" ref="content"></div>  
    </transition>
    <transition name="fade">
      <div class="back" @click="hideContent" v-show="topicContent">
        <img src="static/img/back.svg" alt="" width="30" height="30">
      </div>
    </transition>
  </div>
</template>

<script>
import vHeader from 'components/header/header'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import { preloadImages } from 'common/js/preloadImages2.js'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'topicContent'
    ])
  },
  methods: {
    hideContent () {
      this.$store.dispatch('UPDATA_TOPICCONTENT', null)
    }
  },
  watch: {
    topicContent (newValue, oldValue) {
      if (newValue) {
        // 图片加载完成后,然后(then)再生成BScroll实例,确保高度完整
        preloadImages(newValue).then(() => {
          this.contentScroll = new BScroll(this.$refs.content, {})
        })
      }
    }
  },
  components: {
    vHeader
  }
}
</script>

<style lang="stylus">
#app
  position relative
  width 100%
  height 100%
  .back
    position absolute
    top 0
    left 0
    width 100%
    height 40px
    padding-top 5px
    text-align left
    line-height 40px
    background #444
    z-index 1200
    box-sizing border-box
    &.fade-enter-active, &fade-leave-active
      transition all .5s linear
    &.fade-enter, &.fade-leave-active
      opacity 0  
  .content
    position absolute
    top 40px
    left 0
    bottom 0
    width 100%
    background #fff
    transform translate3d(0, 0, 0)
    z-index 1100
    &.move-enter-active, &.move-leave-active
      transition all .5s ease-out
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
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
