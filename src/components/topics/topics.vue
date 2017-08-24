<template>
  <div>
    <transition name="fade">
      <div class="done-tip" v-show="ajaxLoading">
        <span>刷新成功</span>
      </div>
    </transition>
    <div class="top-tip">
      <span class="refresh-hook">下拉刷新</span>
    </div>
    <ul class="topics">
      <li class="line" v-for="item in topics">
       <div class="header">
          <span class="tab" :class="{'good': item.top || item.good}">{{ classify(item.top, item.good, item.tab) }}</span>
          <span class="title" @click="showDetail($event, item.id)">{{ item.title }}</span>
       </div>
       <div class="detail">
          <div class="avatar">
            <img :src="item.author.avatar_url" alt="" width="32" height="32">
          </div>
          <div class="info">
            <h5 class="author">{{ item.author.loginname }}</h5>
            <p class="time">创建时间: {{ createTime(item.create_at) }}</p>
          </div>
          <div class="reply">
            <p><span class="reply_count">{{ item.reply_count }}</span>/{{ item.visit_count }}</p>
            <p class="ago">{{ item.last_reply_at | agoTime }}</p>
          </div>
       </div>
      </li>
    </ul>
    <div class="bottom-tip">
      <img src="static/img/loading_ajax.gif" v-show="ajaxLoading" alt="" width="20" height="20">
      <span class="loading-hook">加载更多</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatTime } from 'common/js/formatTime.js'

export default {
  name: 'topics',
  props: {
    topics: {
      type: Array
    }
  },
  computed: {
    ...mapState([
      'ajaxLoading'
    ])
  },
  methods: {
    showDetail (e, id) {
      if (!e._constructed) {
          return
      }
      this.$router.push(`/topicDetail/:${id}`)
      // this.$router.push({ name: 'topicDetail', params: { id: id } })
    },
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
            case 'job':
              return '招聘'
            case 'dev':
              return '测试'
          }
        }
      }
    },
    // 帖子创建时间
    createTime (time) {
      return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0]
    }
  },
  filters: {
    // 最后回复时间
    agoTime (time) {
      return formatTime(time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
	@import './topics.styl'
</style>
