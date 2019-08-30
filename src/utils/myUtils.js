// import dayjs from 'dayjs'
//
// /**
//  * 扩展 number原型，增加一些方法
//  */
// Number.prototype.toMS = function () {
//   if (this == null) {
//     return ''
//   } else {
//     let time = this * 1000
//     return dayjs(time).format('mm:ss')
//   }
// }
//
// Number.prototype.formatDate = function () {
//   if (this == null) {
//     return ''
//   } else {
//     let time = this * 1000
//     return dayjs(time).format('YYYY-MM-DD')
//   }
// }
//
// Number.prototype.formatDateFull = function () {
//   if (this == null) {
//     return ''
//   } else {
//     let time = this * 1000
//     return dayjs(time).format('YYYY-MM-DD HH:mm')
//   }
// }
//
// Number.prototype.percent = function () {
//   return (this * 100).toFixed(2) + '%'
// }
// Number.prototype.wan = function () {
//   return this / 10000
// }

/**
 * 图片的阿里 oss 路径，根据当前设备的 dpr 返回不同后缀的路径
 * deviceDpr 为定义在 index.html 中的一个全局变量
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
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_563/quality,Q_85'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_750/quality,Q_90'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_750/quality,Q_95'
      }
      break
    case 'thumb':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_163,h_105/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_244,h_158/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_325,h_210/quality,q_85'
      }
      break
    case 'thumb-md':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_164,h_92/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_246,h_138/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_328,h_184/quality,q_85'
      }
      break
    case 'avatar':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_44,h_44/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_66,h_66/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_88,h_88/quality,q_85'
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
  setCookie (name, value, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires + '; path=/'
  },
  
  /**
   * 获取cookie
   */
  getCookie (name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
  },
  
  /**
   * 清除cookie
   */
  clearCookie (name) {
    this.setCookie(name, '', -1)
  },
  
  /**
   * 往 LocalStorage 中存入历史搜索数据
   */
  setHistorySearchKeys (data) {
    window.localStorage.setItem('historySearchKeys', JSON.stringify(data))
  },
  
  /**
   * 读取 LocalStorage 中的历史搜索数据
   */
  getHistorySearchKeys () {
    return JSON.parse(window.localStorage.getItem('historySearchKeys'))
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
  getArrIndex(arr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  },
  
  /**
   * 关掉键盘，并回到页面顶部，以解决iOS 12中键盘收起后页面底部会有一部分空白的问题
   */
  resetPageInIOS() {
    document.activeElement.blur()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  
  /**
   * 判断是否是微信浏览器
   */
  isInWeChat() {
    return /micromessenger/i.test(navigator.userAgent)
  },
}
