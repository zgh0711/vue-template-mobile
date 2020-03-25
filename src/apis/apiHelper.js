import axios from 'axios/index'


let vue // vue 实例
let showLoading = false // 是否允许显示toast和loading

let BASE_URL = 'https://m1.xxxxxx.com/api'

// 判断是否为正式环境
if (window.location.origin.indexOf('https://m.xxxxxx.com') !== -1) {
  BASE_URL = 'https://m.xxxxxx.com/api'
}

axios.defaults.timeout = 20000

// 请求开始时，开启加载中动画，出错了提示并关闭动画
axios.interceptors.request.use(config => {
  // 每次请求之前先判断下是否有 token，有的话则放到 headers 的 TOKEN 里面
  if (vue) {
    config.headers.common.TOKEN = vue.myUtils.getCookie('token')
  }

  if (showLoading) {
    vue.$toast.loading({
      mask: true,
      duration: 0
    })
  }
  return config
}, error => {
  if (vue) {
    vue.$toast('请求超时!')
  }
  if (showLoading) {
    vue.$toast.clear()
  }
  return Promise.reject(error)
})

// 请求完成时，关闭加载中动画，返回数据或错误信息
axios.interceptors.response.use(response => {
  if (showLoading) {
    vue.$toast.clear()
  }

  // 一切正常，返回数据
  if (response.data) {
    return response.data
  }
}, error => {
  if (showLoading) {
    vue.$toast.clear()
  }
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内，有错误信息则弹出错误信息
    console.error('response-error-data', error.response.data)
  } else {
    // 什么数据都没有，直接出错了
    console.error('Error', error.message)
  }

  return Promise.reject(error)
})

export default {

  // 获取 vue 实例，在应用入口 App.vue 的 created 生命周期中调用一下就行
  setVueInstance(object) {
    vue = object
  },

  // 不带 loading 的 get 请求
  get(url) {
    showLoading = false

    return axios({
      method: 'get',
      url,
      baseURL: BASE_URL
    })
  },

  // 不带 loading 的 post 请求
  post(url, params) {
    showLoading = false

    return axios({
      method: 'post',
      url,
      data: params,
      baseURL: BASE_URL
    })
  },

  // 带 loading 的 get 请求
  getWithLoading(url) {
    showLoading = true

    return axios({
      method: 'get',
      url,
      baseURL: BASE_URL
    })
  },

  // 带 loading 的 post 请求
  postWithLoading(url, params) {
    showLoading = true

    return axios({
      method: 'post',
      url,
      data: params,
      baseURL: BASE_URL
    })
  }
}
