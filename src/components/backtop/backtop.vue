<template>
  <div class="backtop" v-show="showBacktop" @click="backTop">
    <img src="./backtop2.gif" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'backTop',
  data () {
    return {
    }
  },
  props: {
    scroll: {
      type: Object
    }
  },
  computed: {
    ...mapState([
      'showBacktop'
    ])
  },
  methods: {
    backTop () {
      this.scroll.scrollTo(0, 0, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .backtop
    position absolute
    right 15px
    bottom 20px
    z-index 1500
    img
      width 35px
      border-radius 5px
      opacity .7
</style>