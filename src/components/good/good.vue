<template>
  <div class="good" ref="good">
    <topics :topics="topics"></topics>
    <backtop :scroll="scroll"></backtop>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import topics from 'components/topics/topics'
import backtop from 'components/backtop/backtop'
import { dataAjax } from 'common/js/dataAjax'

export default {
  name: 'good',
  data () {
    return {
      topics: [], // 页面所有数据
      tab: null,
      scroll: null
      /* authors: [], // 作者
      tabs: [], // 分类
      tops: [], // 是否顶置
      good: [], // 是否精华
      creates_at: [], // 创建时间
      lasts_reply_at: [], // 最后回复时间
      titles: [] // 标题 */
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'topicDetail') {
      next()
    } else {
      this.good.scrollTo(0, 0, 40)
      this.$store.dispatch('SHOW_BACKTOP', false)
      next()
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
          this.good = new BScroll(this.$refs.good, {
            probeType: 3,
            click: true
          })
          // 用于将scroll对象传递给子组件
          this.scroll = this.good
          // 滑动显示回到顶部按钮
          this.good.on('scroll', (pos) => {
            if (pos.y <= -200) {
              this.$store.dispatch('SHOW_BACKTOP', true)
            } else if (pos.y > -200) {
              this.$store.dispatch('SHOW_BACKTOP', false)
            } else {
              return
            }
          })
          dataAjax(this.good, this.tab, this)
        })
      })
  },
  components: {
    topics,
    backtop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './good.styl'
</style>