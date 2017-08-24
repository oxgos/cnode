<template>
  <div class="job" ref="job">
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
  name: 'job',
  data () {
    return {
      topics: [], // 页面所有数据
      tab: null,
      scroll: null
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'topicDetail') {
      next()
    } else {
      this.job.scrollTo(0, 0, 40)
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
          this.job = new BScroll(this.$refs.job, {
            probeType: 3,
            click: true
          })
          // 用于将scroll对象传递给子组件
          this.scroll = this.job
          // 滑动显示回到顶部按钮
          this.job.on('scroll', (pos) => {
            if (pos.y <= -200) {
              this.$store.dispatch('SHOW_BACKTOP', true)
            } else if (pos.y > -200) {
              this.$store.dispatch('SHOW_BACKTOP', false)
            } else {
              return
            }
          })
          dataAjax(this.job, this.tab, this)
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
  @import './job.styl'
</style>