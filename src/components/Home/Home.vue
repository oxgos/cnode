<template>
  <div class="home" ref="home">
    <div class="list">
      <ul class="list-wrapper">
        <li class="line" v-for="item in topics">
         <div class="header">
            <span class="tab" :class="{'good': item.top || item.good}">{{ classify(item.top, item.good, item.tab) }}</span>
            <span class="title">{{ item.title }}</span>
         </div>
         <div class="detail">
            <div class="avatar">
              <img :src="item.author.avatar_url" alt="" width="40" height="40">
            </div>
            <div class="info">
              <h5 class="author">{{ item.author.loginname }}</h5>
              <p class="time">创建时间: {{ createTime(item.create_at) }}</p>
            </div>
            <div class="reply">
			        <p><span class="reply_count">{{ item.reply_count }}</span>/{{ item.visit_count }}</p>
              <p class="ago">{{ agoTime(item.last_reply_at) }}</p>
            </div>
         </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

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
        limit: 50
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
          this.homeScroll = new BScroll(this.$refs.home, {})
        })
      })
  },
  methods: {
    // 帖子分类
    classify (top, good, tab) {
      if (top) {
        return '顶置'
      } else {
        if (good) {
          return '精华'
        } else {
          switch (tab) {
            case 'share':
              return '分享'
            case 'ask':
              return '问答'
          }
        }
      }
    },
    // 帖子创建时间
    createTime (time) {
      return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0]
    },
    // 最后回复时间
    agoTime (time) {
      let ago = new Date(time)
      ago = ago.getTime()
      let now = new Date()
      now = now.getTime()
      let oneDay = 24 * 3600 * 1000
      if (now - ago > oneDay) {
        let count = Math.round((now - ago) / oneDay)
        return count + '天前'
      } else {
        let count = (now - ago) / 1000 / 3600
        return Math.round(count) + '小时前'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './Home.styl'
</style>