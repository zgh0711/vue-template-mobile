import apiHelper from './apiHelper'

export default {
  /**
   * 获取微信授权后的用户信息
   */
  getWxUserInfo (params) {
    return apiHelper.purePost('后端接口地址，需要换掉',{
      ...params
    })
  },
  
}
