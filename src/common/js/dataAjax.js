export function dataAjax (scroll, tab, vm) {
  let timer = null
  scroll.on('touchend', (pos) => {
    if (pos.y >= 40) { // 头部下拉刷新
      timer && clearTimeout(timer) // 防止用户短时间内多次请求
      timer = setTimeout(() => {
        vm.$ajax.get('https://cnodejs.org/api/v1/topics', {
          params: {
            tab: tab,
            limit: 20
          }
        })
        .then((res) => {
          vm.$store.dispatch('UPDATA_AJAXLOADING')
          vm.topics = res.data.data
          // 等待1.5s后，提示框消失
          vm.$store.dispatch('UPDATA_AJAXLOADING_ASYNC')
          vm.$nextTick(() => {
            scroll.refresh()
          })
        })
      }, 1000)
    } else if (pos.y < scroll.maxScrollY + 10) { // 底部加载更多
      vm.$store.dispatch('UPDATA_AJAXLOADING')
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        let count = 20
        count += 10
        vm.$ajax.get('https://cnodejs.org/api/v1/topics', {
          params: {
            tab: tab,
            limit: count
          }
        })
        .then((res) => {
          vm.$store.dispatch('UPDATA_AJAXLOADING')
          // 加载更多数据放进已有数据里
          let arr = res.data.data.slice(count - 10)
          vm.topics.push(...arr)
          // 列表数量更变，刷新滚动
          vm.$nextTick(() => {
            scroll.refresh()
          })
        })
      }, 1000)
    }
  })
}
