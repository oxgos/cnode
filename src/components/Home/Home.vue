<template>
  <div class="home" ref="home">
    <topics :topics="topics"></topics>
    <backtop :scroll="scroll"></backtop>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import topics from 'components/topics/topics'
import backtop from 'components/backtop/backtop'

export default {
  name: 'home',
  data () {
    return {
      topics: [], // 页面所有数据
      scroll: null,
      pullDownRefresh: true // 设置下拉刷新开关，防止用户频繁请求
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
            probeType: 3,
            startX: 0,
            startY: 0,
            click: true
          })
          // 用于将scroll对象传递给子组件
          this.scroll = homeScroll
          // 滑动显示回到顶部按钮
          homeScroll.on('scroll', (pos) => {
            if (pos.y <= -200) {
              this.$store.dispatch('SHOW_BACKTOP', true)
            } else {
              this.$store.dispatch('SHOW_BACKTOP', false)
            }
          })
          // 下拉时更新数据
          homeScroll.on('touchend', (pos) => {
            if (pos.y >= 40) {
              if (this.pullDownRefresh) {
                this.pullDownRefresh = false
                setTimeout(() => {
                  this.$ajax.get('https://cnodejs.org/api/v1/topics', {
                    params: {
                      limit: 20
                    }
                  })
                  .then((res) => {
                    this.pullDownRefresh = true
                    this.$store.dispatch('UPDATA_AJAXLOADING')
                    this.topics = res.data.data
                    // 等待1s后，提示框消失
                    this.$store.dispatch('UPDATA_AJAXLOADING_ASYNC')
                    this.$nextTick(() => {
                      homeScroll.refresh()
                    })
                  })
                }, 1000)
              } else {
                return
              }
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
    topics,
    backtop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './Home.styl'
</style>