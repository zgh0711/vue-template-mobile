import apiHelper from './apiHelper'

export default {
  /**
   * 获取微信授权后的用户信息
   */
  getWxUserInfo (params) {
    return apiHelper.purePost('/wechat/authorize',{
      ...params
    })
  },
  
}
