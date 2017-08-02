<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import vHeader from './components/header/header'

export default {
  name: 'app',
  components: {
    vHeader
  }
}
</script>

<style>
#app {
  position: relative;
}
</style>
