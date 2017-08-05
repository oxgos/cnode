<template>
  <div class="share" ref="share">
    <topics :topics="topics"></topics>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import topics from 'components/topics/topics'
import { dataAjax } from 'common/js/dataAjax'

export default {
  name: 'share',
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
    console.log(this.$route.path)
    this.$ajax.get('https://cnodejs.org/api/v1/topics', {
      params: {
        tab: 'share',
        limit: 20
      }
    })
      .then((res) => {
        this.topics = res.data.data
        /* this.topics.forEach((item) => {
          this.authors.push(item.author)
          this.tabs.push(item.tab)
          this.tops.push(item.top)
          this.good.push(item.good)
          this.titles.push(item.title)
          this.creates_at.push(item.create_at)
          this.lasts_reply_at.push(item.last_reply_at)
        }) */
        this.$nextTick(() => {
          let share = new BScroll(this.$refs.share, {
            probeType: 1
          })
          /* dataAjax(share, ) */
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
  @import './share.styl'
</style>