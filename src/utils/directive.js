import Vue from 'vue'
/**
 * 自定义指令 v-reset-page，以解决 iOS 12 中键盘收起后页面底部有留白的问题
 */
Vue.directive('resetPage', {
  inserted: function (el) {
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
        //软键盘收起的事件处理
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      }
    })
  }
})

/**
 * 自定义指令 v-drag，活动详情页底部浮动按钮拖动时使用
 */
Vue.directive("drag", {
  bind(el, binding, vnode) {
    let fixBar = {};
    el.style.touchAction = 'none';
    el.addEventListener('touchstart', (evt) => {
      fixBar.curPos = {
        x: el.offsetLeft || 0,
        y: el.offsetTop || 0
      };
      evt.stopPropagation();
      // evt.preventDefault();
    });
    
    el.addEventListener('touchmove', (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      try {
        fixBar.curPos = {
          x: el.offsetLeft,
          y: el.offsetTop
        };
        
        let gap;
        
        if (fixBar.lastPos) {
          let _pos = {
            left: '',
            top: ''
          };
          
          gap = {
            x: evt.changedTouches[0].clientX - fixBar.lastPos.x,
            y: evt.changedTouches[0].clientY - fixBar.lastPos.y
          };
          
          _pos.left = fixBar.curPos.x + gap.x;
          _pos.top = fixBar.curPos.y + gap.y;
          
          
          if (_pos.left <= 0) {
            _pos.left = 0;
          } else if (_pos.left >= (window.screen.width - el.offsetWidth)) {
            _pos.left = window.screen.width - el.offsetWidth;
          }
          
          if (_pos.top <= 0) {
            _pos.top = 0;
          } else if (_pos.top >= window.screen.height - el.offsetHeight) {
            _pos.top = window.screen.height - el.offsetHeight;
          }
          
          el.style.left = _pos.left + 'px';
          el.style.top = _pos.top + 'px';
        }
        
        fixBar.lastPos = {
          x: evt.changedTouches[0].clientX,
          y: evt.changedTouches[0].clientY
        };
      } catch(e) {
        console.log(e);
      }
    }, { passive: false });
    
    el.addEventListener('touchend', (evt) => {
      fixBar.lastPos = null;
      evt.stopPropagation();
      // evt.preventDefault();
    });
  }
})
