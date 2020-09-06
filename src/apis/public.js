import request from './request'

export default {

  /**
   * 将 vue 对象传递给 apiHelper
   */
  setVueObject(vue) {
    request.setVueInstance(vue)
  },

  /**
   * 获取微信授权后的用户信息
   */
  getWxUserInfo(params) {
    return request.post('后端接口地址，需要换掉', {
      ...params
    })
  }

}
