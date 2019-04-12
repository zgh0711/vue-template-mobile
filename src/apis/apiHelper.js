import axios from 'axios/index'
import {Toast} from 'vant'

//vue 实例
let vue = undefined
//是否允许显示toast和loading
let showToast = false
let showLoading = false

let BASE_URL = 'https://m1.xxxxxx.com/api'
//判断是否为正式环境
if (window.location.origin.indexOf('https://m.xxxxxx.com') !== -1) {
  BASE_URL = 'https://m.xxxxxx.com/api'
}

axios.defaults.timeout = 20000
//请求开始时，开启加载中动画，出错了提示并关闭动画
axios.interceptors.request.use(config => {
  if (showLoading) {
    Toast.loading({
      mask: true,
      duration: 0,
    })
  }
  return config
}, error => {
  if (vue && showToast) {
    vue.$toast('请求超时!')
  }
  if (showLoading) {
    Toast.clear()
  }
  return Promise.reject(error)
})

//请求完成时，关闭加载中动画，返回数据或错误信息
axios.interceptors.response.use(response => {
  if (showLoading) {
    Toast.clear()
  }
  //一切正常，返回数据
  if (response.data && response.data.success) {
    return response.data.result
  }
}, error => {
  if (showLoading) {
    Toast.clear()
  }
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内，有错误信息则弹出错误信息
    console.error('response-error-data', error.response.data)
    if (error.response.data.msg != null && error.response.data.msg.length > 0) {
      if (vue && showToast) {
        vue.$toast(error.response.data.msg)
      }
    }
  } else {
    //什么数据都没有，直接出错了
    console.error('Error', error.message)
    if (vue && showToast) {
      vue.$toast('网络出错了，未请求到数据')
    }
  }
  
  return Promise.reject(error)
})

export default class apiHelper {
  static pureGet = (url) => {
    vue = undefined
    showToast = false
    showLoading = false
    
    return axios({
      method: 'get',
      url: url,
      baseURL: BASE_URL,
    })
  }
  
  static purePost = (url, params) => {
    vue = undefined
    showToast = false
    showLoading = false
    
    return axios({
      method: 'post',
      url: url,
      data: params,
      baseURL: BASE_URL,
    })
  }
  
  static get = (vueContext, url, isShow) => {
    showToast = true
    showLoading = true
    if (vueContext != null) {
      vue = vueContext
    }
    
    if (isShow === false) {
      showToast = isShow
    }
    
    return axios({
      method: 'get',
      url: url,
      baseURL: BASE_URL,
    })
  }
  
  static post = (vueContext, url, params, isShow) => {
    showToast = true
    showLoading = true
    if (vueContext != null) {
      vue = vueContext
    }
    
    if (isShow === false) {
      showToast = isShow
    }
    
    return axios({
      method: 'post',
      url: url,
      data: params,
      baseURL: BASE_URL,
    })
  }
};
