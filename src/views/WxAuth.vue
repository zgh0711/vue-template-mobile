<template>
  <div />
</template>

<script>

/**
   * 微信网页授权
   */
export default {
  name: 'WxAuth',

  async created() {
    // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
    // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
    if (this.$route.query.code) {
      const res = await this.apis.public.getWxUserInfo({
        code: this.$route.query.code
      })
      if (res && res.success && res.result) {
        localStorage.setItem('wxUserInfo', JSON.stringify(res.result))
      }
      const redirectUrl = sessionStorage.getItem('wxRedirectUrl')
      this.$router.replace(redirectUrl)
    } else {
      this.$router.replace('/')
    }
  }
}
</script>
