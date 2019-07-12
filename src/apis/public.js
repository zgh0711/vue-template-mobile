import apiHelper from './apiHelper'

export default {
  /**
   * 将 vue 对象传递给 apiHelper
   */
  getVueObject (vue) {
    apiHelper.getVueInstance(vue)
  },
  
  /**
   * 获取微信授权后的用户信息
   */
  getWxUserInfo (params) {
    return apiHelper.purePost('后端接口地址，需要换掉',{
      ...params
    })
  },
  
}
