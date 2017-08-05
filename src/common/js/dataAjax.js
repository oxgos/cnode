export function dataAjax (scroll, tab) {
  scroll.on('touchend', (pos) => {
    if (pos.y >= 40) {
      setTimeout(() => {
        this.$ajax.get('https://cnodejs.org/api/v1/topics', {
          params: {
            tabs: tab,
            limit: 20
          }
        })
        .then((res) => {
          this.$store.dispatch('UPDATA_AJAXLOADING')
          this.topics = res.data.data
          // 等待1.5s后，提示框消失
          this.$store.dispatch('UPDATA_AJAXLOADING_ASYNC')
          this.$nextTick(() => {
            scroll.refresh()
          })
        })
      }, 1000)
    } else if (pos.y < scroll.maxScrollY + 10) {
      this.$store.dispatch('UPDATA_AJAXLOADING')
      setTimeout(() => {
        let count = 20
        count += 10
        this.$ajax.get('https://cnodejs.org/api/v1/topics', {
          params: {
            tabs: tab,
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
            scroll.refresh()
          })
        })
      }, 1000)
    }
  })
}
