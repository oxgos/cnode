<template>
  <div id="app">
    <v-header></v-header>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
    <div class="mask" v-show="menuStatus" @click="hideM"></div>
  </div>
</template>

<script>
import vHeader from 'components/header/header'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapState([
      'menuStatus',
      'maskStatus'
    ])
  },
  methods: {
    hideM () {
      this.$store.dispatch('CHANGE_MENUSTATUS')
    }
  },
  watch: {
    '$route' (to, from) {
      // 页面过渡索引
      let index = {
        'Home': 0,
        'good': 1,
        'share': 2,
        'ask': 3,
        'job': 4,
        'dev': 5,
        'login': 6,
        'topicDetail': 7
      }
      this.transitionName = (index[to.name] > index[from.name]) ? 'slide-left' : 'slide-right'
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
  .view
    width 100%
    transition all 0.35s cubic-bezier(.42, 0, .58, 1)
  .slide-left-enter, .slide-right-leave-active
    opacity 0
    -webkit-transform: translateX(500px)
  .slide-left-leave-active, .slide-right-enter 
    opacity 0
    -webkit-transform translateX(-500px)
    transform translateX(-500px)
  .mask
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    padding-top 200px
    background rgba(0, 0, 0, .5)
    z-index 1250
</style>
