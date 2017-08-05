<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from 'components/header/header'

export default {
  name: 'app',
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
