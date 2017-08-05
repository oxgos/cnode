<template>
  <div class="ask" ref="ask">
    <topics :topics="topics"></topics>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import topics from 'components/topics/topics'
import { dataAjax } from 'common/js/dataAjax'

export default {
  name: 'ask',
  data () {
    return {
      topics: [], // 页面所有数据
      tab: null
    }
  },
  created () {
    this.tab = this.$route.path.slice(1)
    this.$ajax.get('https://cnodejs.org/api/v1/topics', {
      params: {
        tab: this.tab,
        limit: 20
      }
    })
      .then((res) => {
        this.topics = res.data.data
        this.$nextTick(() => {
          let ask = new BScroll(this.$refs.ask, {
            probeType: 1,
            click: true
          })
          dataAjax(ask, this.tab, this)
        })
      })
  },
  components: {
    topics
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './ask.styl'
</style>