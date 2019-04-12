import wx from 'weixin-js-sdk'
import store from '../store'
import apiHelper from '../apis/apiHelper'

export default {
  initConfig (url) {
    if (!/micromessenger/i.test(navigator.userAgent)) {
      return
    }
    
    //如果是 iOS 设备，则使用第一次进入App时的 URL 去请求 wxConfig，不然的话会导致 iOS 中分享的链接不对
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //记录第一次进入时的链接，iOS 分享时需要用到
      if (!store.state.theFirstLink) {
        store.commit('setTheFirstLink', url)
      } else {
        url = store.state.theFirstLink
      }
    }
  
    // 将 url 传给后台请求微信签名配置
    apiHelper.purePost('后端的请求地址，需要更换', {url: url}).then(data => {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
      if (data) {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId,   // 必填，公众号的唯一标识
          nonceStr: data.nonceStr,   // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      }
    })
  },
  
  share (title, url, imgUrl, desc) {
    if (!/micromessenger/i.test(navigator.userAgent)) {
      return
    }
    let shareImg = '默认的分享图片地址，需要更换'
    if (imgUrl) {
      shareImg = imgUrl
    }
    let shareDesc = '默认的分享文案，需要更换'
    if (desc) {
      shareDesc = desc
    }
    
    wx.ready(() => {
      // 如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行
      // 在 weixin-js-sdk 1.4 之后，分享到朋友和朋友圈要分别使用 updateAppMessageShareData，updateTimelineShareData
      // 这里为了兼容老版本的微信，所以把以前的老版本的方法也写上
      wx.updateAppMessageShareData({
        title: title, // 分享标题
        desc: shareDesc, // 分享描述
        link: url, // 分享链接 默认以当前链接
        imgUrl: shareImg // 分享图标
      })
      wx.updateTimelineShareData({
        title: title,
        link: url,
        imgUrl: shareImg
      })
      wx.onMenuShareAppMessage({ // 分享给朋友，此方法即将被废弃，改用 updateAppMessageShareData
        title: title,
        desc: shareDesc,
        link: url,
        imgUrl: shareImg
      })
      wx.onMenuShareTimeline({ //分享到朋友圈，此方法即将被废弃，改用 updateTimelineShareData
        title: title,
        link: url,
        imgUrl: shareImg
      })
      wx.error(res => {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，
        // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
      })
    })
  },
}



