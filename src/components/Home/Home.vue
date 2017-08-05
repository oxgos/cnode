<template>
  <div class="home" ref="home">
    <topics :topics="topics"></topics>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import topics from 'components/topics/topics'

export default {
  name: 'home',
  data () {
    return {
      topics: [] // 页面所有数据
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
    this.$ajax.get('https://cnodejs.org/api/v1/topics', {
      params: {
        limit: 20
      }
    })
      .then((res) => {
        this.topics = res.data.data
        // DOM元素渲染完后,创建滚动
        this.$nextTick(() => {
          let homeScroll = new BScroll(this.$refs.home, {
            probeType: 1,
            click: true
          })
          // 下拉时更新数据
          homeScroll.on('touchend', (pos) => {
            if (pos.y >= 40) {
              setTimeout(() => {
                this.$ajax.get('https://cnodejs.org/api/v1/topics', {
                  params: {
                    limit: 20
                  }
                })
                .then((res) => {
                  this.$store.dispatch('UPDATA_AJAXLOADING')
                  this.topics = res.data.data
                  // 等待1.5s后，提示框消失
                  this.$store.dispatch('UPDATA_AJAXLOADING_ASYNC')
                  this.$nextTick(() => {
                    homeScroll.refresh()
                  })
                })
              }, 1000)
            } else if (pos.y < homeScroll.maxScrollY + 10) {
              this.$store.dispatch('UPDATA_AJAXLOADING')
              setTimeout(() => {
                let count = 20
                count += 10
                this.$ajax.get('https://cnodejs.org/api/v1/topics', {
                  params: {
                    limit: count
                  }
                })
                .then((res) => {
                  this.$store.dispatch('UPDATA_AJAXLOADING')
                  // 加载更多数据放进已有数据里
                  let arr = res.data.data.slice(count - 10)
                  this.topics.push(...arr)
                  // 列表数量更变，刷新滚动
                  this.$nextTick(() => {
                    homeScroll.refresh()
                  })
                })
              }, 1000)
            }
          })
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
  @import './Home.styl'
</style>