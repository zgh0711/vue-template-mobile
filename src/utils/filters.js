export default {
  /**
   * 隐藏名字中间字符，传入的 length 表示最后一共保留几位字符
   */
  hideName (name, length) {
    if (name.length >= 2) {
      let firstStr = name.charAt(0)
      let arr = Array(name.length - 1).fill('*')
      let str = arr.join().replace(/,/g, '')
      
      if (length && length < name.length) {
        str = str.substring(0, length - 1)
      }
      return firstStr + str
    } else {
      return name
    }
  },
  
  /**
   * 格式化价格
   */
  currency (value, discount) {
    if (!value) {
      value = 0
    }
    let fixNum = (Number(value) + 1).toFixed(discount)//四舍五入之前加1
    let fixedNum = Number(fixNum - 1).toFixed(discount)//四舍五入之后减1，再四舍五入一下
    return '￥' + fixedNum
  },
  
  /**
   * 优惠券折扣价格显示
   */
  discount (input) {
    return (parseFloat(input) * 10).toFixed(1)
  },
  
  /**
   * 格式化时间戳为 2019年12月30日  的格式
   */
  dateYMD (timestamp) {
    if (!timestamp) return ''
    let d = new Date(Number(timestamp))
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    return year + '年' + month + '月' + day + '日'
  },
  
  /**
   * 格式化时间戳为 12.30 09:58 的格式
   */
  dateMDHM (timestamp) {
    if (!timestamp) return ''
    let d = new Date(Number(timestamp))
    let month = d.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    let hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    return month + '.' + day + ' ' + hour + ':' + minutes
  },
  
  /**
   * 格式化时间戳为 2019.12.30 09:58 的格式
   */
  dateYMDHM (timestamp) {
    if (!timestamp) return ''
    let d = new Date(Number(timestamp))
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    let hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    return year + '.' + month + '.' + day + ' ' + hour + ':' + minutes
  },
  
  /**
   * 已报名列表中以不同的时间显示报名时的时间
   */
  differenceTimeText (timestamp) {
    let current = new Date().getTime()
    let difference = parseInt((current - timestamp) / 1000) //精确到秒
    if (difference < 60) {
      return difference + '秒前'
    } else if (difference < 60 * 60) {
      return parseInt(difference / 60) + '分钟前'
    } else if (difference < 60 * 60 * 24) {
      return parseInt(difference / 60 / 60) + '小时前'
    } else {
      //超过24小时按天算
      let differenceDay = parseInt(current / (60 * 60 * 24 * 1000)) - parseInt(timestamp / (60 * 60 * 24 * 1000))
      if (differenceDay > 2) {
        return '3天前'
      } else if (differenceDay > 1) {
        return '前天'
      } else {
        return '昨天'
      }
    }
  },
}
