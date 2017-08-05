<template>
  <div class="good" ref="good">
    <topics :topics="topics"></topics>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import topics from 'components/topics/topics'
import { dataAjax } from 'common/js/dataAjax'

export default {
  name: 'good',
  data () {
    return {
      topics: [], // 页面所有数据
      tab: null
      /* authors: [], // 作者
      tabs: [], // 分类
      tops: [], // 是否顶置
      good: [], // 是否精华
      creates_at: [], // 创建时间
      lasts_reply_at: [], // 最后回复时间
      titles: [] // 标题 */
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
          let good = new BScroll(this.$refs.good, {
            probeType: 1,
            click: true
          })
          dataAjax(good, this.tab, this)
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
  @import './good.styl'
</style>