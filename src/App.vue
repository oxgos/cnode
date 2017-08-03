<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import vHeader from 'components/header/header'
import { _Ajax } from 'common/js/_Ajax.js'

export default {
  name: 'app',
  created () {
    console.log(this.$route.path)
    _Ajax(this, 'good')
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
