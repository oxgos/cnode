export function formatTime (time) {
	  let ago = new Date(time)
      ago = ago.getTime()
      let now = new Date()
      now = now.getTime()
      let oneDay = 24 * 3600 * 1000
      if (now - ago >= oneDay * 30) {
      	let count = Math.floor(((now - ago) / (oneDay * 30)))
      	return count + '个月前'
      } else if (now - ago >= oneDay) {
        let count = Math.round((now - ago) / oneDay)
        return count + '天前'
      } else if (now - ago >= 3600000 && (now - ago < oneDay)) {
        let count = (now - ago) / 1000 / 3600
        return Math.round(count) + '小时前'
      } else {
        let count = (now - ago) / 1000 / 60
        return Math.round(count) + '分钟前'
      }
}
