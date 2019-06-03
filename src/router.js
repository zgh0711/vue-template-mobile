import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import wxShare from './utils/wxShare'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    //页面加载出来后将页面滚动到顶部，避免微信缓存了前面列表页的滚动位置导致进入详情页后自动滚动到底部的问题
    if (to.name === 'xxxxxx') {
      return {x: 0, y: 0}
    }
  },
  routes: [
    // 如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面,也可以指向一个专门的 404 页面
    {path: "*", redirect: "/"},
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/WxAuth',
      name: 'WxAuth',
      component: () => import('./views/WxAuth.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!/micromessenger/i.test(navigator.userAgent)) {
    next()
    return
  }
  //不要对 WxAuth 路由进行拦截，不进入 WxAuth 路由就拿不到微信返回的授权 code
  if (to.name === 'WxAuth') {
    next()
    return
  }
  
  let wxUserInfo = localStorage.getItem('wxUserInfo')
  if (!wxUserInfo) {
    //保存当前路由地址，授权后还会跳到此地址
    sessionStorage.setItem('wxRedirectUrl', to.fullPath)
    //请求微信授权,并跳转到 /WxAuth 路由
    let appId = '测试服AppId'
    let redirectUrl = encodeURIComponent('https://m1.xxxxxx.com/WxAuth')
    //判断是否为正式环境
    if (window.location.origin.indexOf('https://m.xxxxxx.com') !== -1) {
      appId = '正式服AppId'
      redirectUrl = encodeURIComponent('https://m.xxxxxx.com/WxAuth')
    }
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  //微信分享前初始化 wxConfig
  wxShare.initConfig(location.origin + '/dc' + to.fullPath)
})

export default router
