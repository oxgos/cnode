export function _Ajax (vm, tab) {
  vm.$ajax.get('https://cnodejs.org/api/v1/topics', {
    params: {
      tab: tab,
      limit: 50
    }
  })
  .then((res) => {
    console.log(res.data.data)
  })
}
