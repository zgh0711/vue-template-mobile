import './assets/css/common.css'
import './utils/directive'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import apis from './apis'
import wxShare from './utils/wxShare'
import myUtils from './utils/myUtils'
import filters from './utils/filters'

import {
  Lazyload, Toast, List, Swipe, SwipeItem
} from 'vant'

Vue.config.productionTip = false
Vue.prototype.apis = apis
Vue.prototype.toast = Toast
Vue.prototype.wxShare = wxShare
Vue.prototype.myUtils = myUtils

//全局注册 filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 使用 Vue.use 和 Vue.component 全局注册组件，这里的第一个参数就是后面可以在其他组件内使用的标签名，并使用动态导入来延迟加载组件
Vue.component('titleBar', () => import('./components/TitleBar'))
Vue.component('baseDialog', () => import('./components/BaseDialog'))
Vue.component('infiniteList', () => import('./components/InfiniteList'))

Vue.use(List)
  .use(Toast)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, {
    // error: require('./assets/img/img_placeholder.svg'),
    // loading: require('./assets/img/img_placeholder.svg'),
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
