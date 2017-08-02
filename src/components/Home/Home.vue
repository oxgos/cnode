<template>
  <div class="home">
    <div class="list">
      <ul class="list-wrapper">
        <li class="line" v-for="item in topics">
         <div class="header">
            <span class="tab">{{ classify(item.top, item.tab) }}</span>
            <span class="title">{{ item.title }}</span>
         </div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      topics: [], // 页面所有数据
      authors: [], // 作者
      tabs: [], // 分类
      tops: [], // 是否顶置
      good: [], // 是否精华
      creates_at: [], // 创建时间
      lasts_reply_at: [], // 最后回复时间
      titles: [] // 标题
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
        this.topics.forEach((item) => {
          this.authors.push(item.authors)
          this.tabs.push(item.tab)
          this.tops.push(item.top)
          this.good.push(item.good)
          this.titles.push(item.title)
          this.creates_at.push(item.create_at)
          this.lasts_reply_at.push(item.last_reply_at)
        })
      })
  },
  methods: {
    classify (top, tab) {
      if (top) {
        return '顶置'
      } else {
        switch (tab) {
          case 'good':
            return '精华'
          case 'share':
            return '分享'
          case 'ask':
            return '问答'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './Home.styl'
</style>