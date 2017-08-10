export function preloadImages (str) {
  let newImages = []
  let loadedImages = 0
  let arr = str.match(/src="(.+)"\s{1}/g)
  let postaction = function () {}
  for (let i = 0; i < arr.length; i++) {
    newImages[i] = new Image()
    newImages[i].src = arr[i].slice(5, -2)
    newImages[i].onload = () => {
      imageLoadPost(newImages)
    }
    newImages[i].onerror = () => {
      imageLoadPost(newImages)
    }
  }
  return {
    done (fn) {
      postaction = fn || postaction
    }
  }
  function imageLoadPost () {
    loadedImages++
    if (loadedImages === arr.length) {
      postaction(newImages)
    }
  }
}
