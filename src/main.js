import './assets/css/core.min.css'
import './assets/css/common.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apis from './apis'
import './components/debounce'
import './utils/directive'
import wxShare from './utils/wxShare'
import myUtils from './utils/myUtils'
import {PullRefresh, Lazyload, Button, Toast, List} from 'vant'

Vue.config.productionTip = false
Vue.prototype.apis = apis
Vue.prototype.wxShare = wxShare
Vue.prototype.myUtils = myUtils

Vue.use(PullRefresh)
   .use(Button)
   .use(Toast)
   .use(List)
   .use(Lazyload,{
      // error: require('./assets/img/img_placeholder.svg'),
      // loading: require('./assets/img/img_placeholder.svg'),
   })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
