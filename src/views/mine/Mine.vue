<template>
  <div class="mine">
    <h2>我是谁</h2>
    <p>85年生人，已经被现实捶打了无数遍的中年社畜。30 岁时通过自学的方式从外贸行业转行进入 IT 编程领域，
    最初是做 Android 开发，后转入前端领域。以后打算专注于前端领域，正在往资深前端方向努力<br>
      如有需要，可通过下面微信二维码与我联系
    </p>

    <img src="../../assets/img/QRCode.jpg" alt="">
  </div>
</template>

<script>
/**
 * Mine组件
 */
export default {
  name:'Mine',
  data () {
    return {}
  },

  mounted () {

  },
}
</script>

<style lang="less" scoped>
.mine{
  padding: 30px;
  img{
    width: 480px;
    height: 480px;
    margin-top: 30px;
  }
}
</style>
