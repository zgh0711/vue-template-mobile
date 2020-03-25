/**
 * 给图片路径加上 OSS 规则
 * 根据当前设备的 dpr 返回不同后缀的路径
 * @param type 传入字符串，现共有四种类型：avatar，banner，thumb，thumb-md
 * @returns {string}
 */
String.prototype.ossImg = function (type) {
  let url = this
  if (url == null || url.length === 0 || url === '') {
    return ''
  }
  
  //获取设备 dpr，用于oss获取不同分辨率的图片
  let deviceDpr = 2
  if (typeof window !== 'undefined') {
    deviceDpr = window.devicePixelRatio
  }
  
  //根据设备的 dpr 和图片要显示的位置设置不同的请求参数
  switch (type) {
    case 'banner':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_552,h_192/quality,Q_85'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_690,h_240/quality,Q_90'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_690,h_240/quality,Q_95'
      }
      break
    case 'thumb':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_192,h_128/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_240,h_160/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_288,h_192/quality,q_90'
      }
      break
    case 'detail':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_600,h_400/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_750,h_500/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_900,h_600/quality,q_90'
      }
      break
    case 'avatar':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_44,h_44/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_66,h_66/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_88,h_88/quality,q_90'
      }
      break
    default:
      url = url.replace('http:', '')
      break
  }
  
  return url
}

export default {
  /**
   * 判断字符串是否为空
   * @param str
   * @returns {boolean}
   */
  isNull (str) {
    return str == null || str.length === 0 || str === ''
  },
  
  /**
   *
   * @desc  判断是否为身份证号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  isIdCard (str) {
    return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str)
  },
  
  /**
   *
   * @desc   判断是否为手机号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  isPhoneNum (str) {
    return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
  },
  
  /**
   * 隐藏手机号中间四位
   */
  hidePhoneNum (phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },
  
  /**
   *
   * @desc   判断是否为邮箱
   * @param  {String|Number} str
   * @return {Boolean}
   */
  isMail (str) {
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(str)
  },
  
  /**
   * set 页面 title
   */
  setTitle (title) {
    document.title = title
  },
  
  /**
   * 设置cookie,注意cookie有一个域的问题，如果不指定path，cookie可能会存到不同的域下，
   * 这样就可能会导致cookie写入不成功，或者cookie没清掉
   */
  setCookie (name, value, exdays = 30) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires + '; path=/'
  },
  
  /**
   * 获取cookie
   */
  getCookie (name) {
    let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr != null) return unescape(arr[2])
    return null
  },
  
  /**
   * 清除cookie
   */
  clearCookie (name) {
    this.setCookie(name, '', -1)
  },
  
  /**
   * 弹出 toast，传入vue 对象和 msg
   */
  showToast (vue, msg, position = 'middle', duration = 3000) {
    vue.toast({message: msg, position: position, duration: duration})
  },
  
  /**
   * 禁止页面滚动和解除滚动的共用函数，具体看这个文章
   * https://blog.csdn.net/qq_29606781/article/details/67650869
   * 1：相同事件绑定和解除，需要使用共用函数；绑定和解除事件时 事件没有"on" 即onclick写成click
   * 2：共用函数不能带参数；（即下面在调用的时候是用的 this.bodyScroll，不能带()。）
   */
  bodyScroll (event) {
    event.preventDefault()
  },
  
  /**
   * 禁止页面滚动，解决弹框出现时 IOS 上滚动穿透的问题
   */
  forbidBodyScroll () {
    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.bodyScroll, {passive: false})
  },
  
  /**
   * 解除禁止滚动，解决弹框出现时 IOS 上滚动穿透的问题
   */
  allowBodyScroll () {
    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.bodyScroll)
  },
  
  /**
   * 获取数组中元素的 index
   */
  getArrIndex (arr, value) {
    let i = arr.length
    while (i--) {
      if (arr[i] === value) {
        return i
      }
    }
    return -1
  },
  
  /**
   * 关掉键盘，并回到页面顶部，以解决iOS 12中键盘收起后页面底部会有一部分空白的问题
   */
  resetPageInIOS () {
    document.activeElement.blur()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  
  /**
   * 判断是否是微信浏览器
   */
  isInWeChat () {
    return /micromessenger/i.test(navigator.userAgent)
  },
  
  /**
   * 判断是否登录，以是否有 token 为判断依据
   */
  isLogin () {
    return !!this.getCookie('token')
  },
  
  /**
   * 去登录，携带当前页面的 URL，以便登录完了直接返回
   */
  goToLogin (vue, redirectUrl) {
    vue.$router.replace(`/login?redirect_url=${redirectUrl}`)
  },
  
  /**
   * 计算倒计时，返回天，小时，分钟，秒
   */
  calCountdown (countdown) {
    let day = Math.floor(countdown / (24 * 3600 * 1000))//计算出相差天数
    let leave1 = countdown % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)
    return {
      day: day,
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    }
  },
  
  /**
   * 处理分享内容，将活动详情里的所以标签和样式都去掉，仅保留文字，并去掉头尾和多余的空白字符，
   */
  pureTextForData (str) {
    if (!str) {
      return ''
    }
    
    let d = document.createElement('div')
    d.innerHTML = str
    d = d.innerText.replace(/\s+/g, ' ').trim()
    d = d.substring(0, 100)
    return d
  },
  
  /**
   * 生成 guid
   */
  generateGuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
}
