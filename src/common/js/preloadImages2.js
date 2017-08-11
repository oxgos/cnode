export function preloadImages (str) {
	// 已加载完的图片数量
	let loadedImage = 0
	// 存放图片的数组
	let newImages = []
	// 处理存入字符串,取得src部分
	let arr = str.match(/src="(.+)"\s{1}/g)
  // 返回一个Promise对象
	return new Promise((resolve, reject) => {
		for (let i = 0; i < arr.length; i++) {
			newImages[i] = new Image()
			// 设置图片src属性
			newImages[i].src = arr[i].slice(5, -2)
			// 图片绑定onload事件,确保加载完成
			newImages[i].onload = () => {
				loadedImage++
				// 当全部加载完成后,resolve
				if (loadedImage === arr.length) {
					resolve()
				}
			}
			newImages[i].onerror = () => {
				reject()
			}
		}
	})
}
