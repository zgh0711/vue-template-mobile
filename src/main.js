import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apis from './apis'
import wxShare from './utils/wxShare'
import myUtils from './utils/myUtils'
import {Button, Toast} from 'vant'

Vue.config.productionTip = false
Vue.prototype.apis = apis
Vue.prototype.wxShare = wxShare
Vue.prototype.myUtils = myUtils

Vue.use(Button)
   .use(Toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
