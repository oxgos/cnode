<template>
  <div id="app">
    <v-header v-show='showHeader'></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="mask" v-show="menuStatus" @click="hideM"></div>
    <div class="backTop">
      <img src="static/img/updater.png" alt="">
    </div>
  </div>
</template>

<script>
import vHeader from 'components/header/header'
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'showHeader',
      'menuStatus',
      'maskStatus'
    ])
  },
  methods: {
    hideM () {
      this.$store.dispatch('CHANGE_MENUSTATUS')
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
  .mask
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    padding-top 200px
    background rgba(0, 0, 0, .5)
    z-index 1250
  .backTop
    position absolute
    bottom 10px
    right 0px
    opacity .8
    z-index 1200
    img
      width 60px
      height 60px
</style>
