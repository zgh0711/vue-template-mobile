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
  if (myUtils.isNull(url)) {
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
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_563,h_275/quality,Q_85'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_750,h_366/quality,Q_90'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_750,h_366/quality,Q_95'
      }
      break
    case 'thumb':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_127,h_72/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_190,h_108/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_254,h_144/quality,q_85'
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

export default class myUtils {
  /**
   * 判断字符串是否为空
   * @param str
   * @returns {boolean}
   */
  static isNull (str) {
    return str == null || str.length === 0 || str === ''
  }
  
  /**
   *
   * @desc  判断是否为身份证号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isIdCard (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
      str)
  }
  
  /**
   *
   * @desc   判断是否为手机号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isPhoneNum (str) {
    return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
  }
  
  /**
   * 隐藏手机号中间四位
   */
  static hidePhoneNum (phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  
  /**
   *
   * @desc   判断是否为邮箱
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isMail (str) {
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(str)
  }
  
  /**
   * set 页面 title
   */
  static setTitle (title) {
    document.title = title
  }
  
  /**
   * 设置cookie,注意cookie有一个域的问题，如果不指定path，cookie可能会存到不同的域下，
   * 这样就可能会导致cookie写入不成功，或者cookie没清掉
   */
  static setCookie (name, value, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires + '; path=/'
  }
  
  /**
   * 获取cookie
   */
  static getCookie (name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
  }
  
  /**
   * 清除cookie
   */
  static clearCookie (name) {
    this.setCookie(name, '', -1)
  }
  
  /**
   * 往 LocalStorage 中存入历史搜索数据
   */
  static setHistorySearchKeys (data) {
    window.localStorage.setItem('historySearchKeys', JSON.stringify(data))
  }
  
  /**
   * 读取 LocalStorage 中的历史搜索数据
   */
  static getHistorySearchKeys () {
    return JSON.parse(window.localStorage.getItem('historySearchKeys'))
  }
  
  /**
   * 弹出 toast，传入vue 对象和 msg
   */
  static showToast (vue, msg, duration = 2000) {
    vue.Toast({message: msg, position: 'bottom', duration: duration})
  }
  
  /**
   * 禁止页面滚动和解除滚动的共用函数，具体看这个文章
   * https://blog.csdn.net/qq_29606781/article/details/67650869
   * 1：相同事件绑定和解除，需要使用共用函数；绑定和解除事件时 事件没有"on" 即onclick写成click
   * 2：共用函数不能带参数；（即下面在调用的时候是用的 this.bodyScroll，不能带()。）
   */
  static bodyScroll (event) {
    event.preventDefault()
  }
  
  /**
   * 禁止页面滚动，解决弹框出现时 IOS 上滚动穿透的问题
   */
  static forbidBodyScroll () {
    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.bodyScroll, {passive: false})
  }
  
  /**
   * 解除禁止滚动，解决弹框出现时 IOS 上滚动穿透的问题
   */
  static allowBodyScroll () {
    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.bodyScroll)
  }
  
  /**
   * 获取数组中元素的 index
   */
  static getArrIndex(arr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  }
  
  /**
   * 关掉键盘，并回到页面顶部，以解决iOS 12中键盘收起后页面底部会有一部分空白的问题
   */
  static resetPageInIOS() {
    document.activeElement.blur()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
