export default {
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
   * 分享前处理内容，将内容中的所有标签和样式都去掉，仅保留文字，并去掉头尾和多余的空白字符，
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
