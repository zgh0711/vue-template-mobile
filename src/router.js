import Vue from 'vue'
import Router from 'vue-router'
import wxShare from './utils/wxShare'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // 如果savedPosition存在，滚动条会自动跳到记录的值的地方
      return savedPosition
    }
    return { x: 0, y: 0 }// savedPosition也是一个记录x轴和y轴位置的对象
  },
  routes: [
    // 如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面,也可以指向一个专门的 404 页面
    { path: '*', redirect: '/home' },
    { path: '/WxAuth', name: 'WxAuth', component: () => import('./views/WxAuth.vue') },

    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('./views/Home.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!/micromessenger/i.test(navigator.userAgent)) {
    next()
    return
  }

  // 不要对 WxAuth 路由进行拦截，不进入 WxAuth 路由就拿不到微信返回的授权 code
  if (to.name === 'WxAuth') {
    next()
    return
  }

  const wxUserInfo = localStorage.getItem('wxUserInfo')
  if (!wxUserInfo) {
    // 保存当前路由地址，授权后还会跳到此地址
    sessionStorage.setItem('wxRedirectUrl', to.fullPath)

    // 请求微信授权,并跳转到 /WxAuth 路由
    //todo 注意修改 appId 和应用访问 URL
    let appId = '测试服AppId'
    let redirectUrl = encodeURIComponent('https://m1.xxxxxx.com/WxAuth')

    // 判断是否为正式环境
    if (window.location.origin.indexOf('https://m.xxxxxx.com') !== -1) {
      appId = '正式服AppId'
      redirectUrl = encodeURIComponent('https://m.xxxxxx.com/WxAuth')
    }
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ appId }&redirect_uri=${ redirectUrl }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  } else {
    next()
  }
})

router.afterEach((to) => {
  // 微信分享前初始化 wxConfig
  wxShare.initConfig(`${ location.origin }/dc${ to.fullPath }`)
})

export default router
