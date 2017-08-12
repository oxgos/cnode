<template>
  <div id="app">
    <v-header v-show='showHeader'></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from 'components/header/header'
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'showHeader'
    ])
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
</style>
