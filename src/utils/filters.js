export default {
  /**
   * 给图片路径加上 OSS 规则，根据当前设备的 dpr 返回不同后缀的路径
   * @param imgUrl 图片的原始 URL
   * @param type 传入字符串，现共有四种类型：avatar，banner，thumb，thumb-md
   * @returns {string}
   */
  oss (imgUrl, type) {
    if (imgUrl == null || imgUrl.length === 0 || imgUrl === '') {
      return ''
    }

    //获取设备 dpr，用于oss获取不同分辨率的图片
    let deviceDpr = 2
    if (typeof window !== 'undefined') {
      deviceDpr = window.devicePixelRatio
    }

    //根据设备的 dpr 和图片要显示的位置设置不同的请求参数
    //todo 具体的图片显示规则需要根据自己项目的 UI 图来做不同的修改，此处只是给出示例
    switch (type) {
      case 'banner':
        if (deviceDpr < 1.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_552,h_192/quality,Q_85'
        } else if (1.5 <= deviceDpr < 2.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_690,h_240/quality,Q_90'
        } else if (deviceDpr >= 2.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_690,h_240/quality,Q_95'
        }
        break
      case 'thumb':
        if (deviceDpr < 1.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_192,h_128/quality,q_80'
        } else if (1.5 <= deviceDpr < 2.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_240,h_160/quality,q_85'
        } else if (deviceDpr >= 2.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_288,h_192/quality,q_90'
        }
        break
      case 'avatar':
        if (deviceDpr < 1.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_44,h_44/quality,q_80'
        } else if (1.5 <= deviceDpr < 2.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_66,h_66/quality,q_85'
        } else if (deviceDpr >= 2.5) {
          imgUrl = imgUrl.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_88,h_88/quality,q_90'
        }
        break
      default:
        imgUrl = imgUrl.replace('http:', '')
        break
    }

    return imgUrl
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
}
