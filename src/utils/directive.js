import Vue from 'vue'

/**
 * 自定义指令 v-reset-page，以解决 iOS 12 中键盘收起后页面底部有留白的问题
 */

Vue.directive('resetPage', {
  inserted(el) {
    // 该方法有时候会出现点击了键盘右上角完成按钮，键盘收起又弹出的情况
    // el.addEventListener('blur', function () {
    //   if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //     let currentPosition, timer
    //     let speed = 1//页面滚动距离
    //     timer = setInterval(function () {
    //       currentPosition = document.documentElement.scrollTop || document.body.scrollTop
    //       currentPosition -= speed
    //       window.scrollTo(0, currentPosition)//页面向上滚动
    //       currentPosition += speed //speed变量
    //       window.scrollTo(0, currentPosition)//页面向下滚动
    //       clearInterval(timer)
    //     }, 100)
    //   }
    // })

    document.body.addEventListener('focusout', () => {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        // 软键盘收起的事件处理
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      }
    })
  }
})
