<template>
  <div class="home">
    <h2>这个项目是啥</h2>
    <p>Vue 移动端新项目模板，封装了 H5 项目开发中一些比较常用的功能，比如：微信授权及分享、axios 封装、移动端 vw 适配、UI 组件库等等。</p>

    <h2>为什么会有这个项目</h2>
    <p>本人从事前端开发工作已有四年，这期间做的大部分都是移动端 H5 项目，这几年来大大小小的 H5 项目也做了有十几个了。
       基于移动端 H5 项目来说，有些功能和配置其实是通用的，基本上每个项目都会用到，比如说：微信授权及分享、UI 组件库、各种小组件等。
       基于我平时比较喜欢总结以及为了以后开发 H5 项目省事的目的，就有了这个项目（主要就是为了偷懒，，，）</p>

    <h2>特色功能</h2>
    <p>微信网页授权和分享</p>
    <p>axios 封装，拦截器配置，接口定义模块</p>
    <p>自定义指令、过滤器、utils 都已写好几个基本的模版，可根据需要增减</p>
    <p>已写好 App 底部导航 AppNavBar 组件，可自行对其进行调整</p>
    <p>本人常用的几个公共 css，不需要可去掉</p>
    <p>几个移动端开发中可能会用到的组件，不需要可去掉</p>
    <p>开发环境下引入 vconsole 进行调试，不需要可去掉</p>
    <p>postcss-px-to-viewport 移动端适配，不需要可去掉</p>
    <p>移动端组件库 vantUI，按需加载并全局引入了几个常用组件，不需要可去掉</p>
    <p>加入打包脚本 build.js，打包时会自动将版本号 +1，并压缩成 zip 包后放入 packages 文件夹中，不需要可去掉</p>

    <br>
    <br>
    <p>使用方法及更多详细信息请前往 Github 搜索 zgh0711/vue-template-mobile 查看并顺手点下 star 哈</p>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return{
    }
  },

  mounted() {
    this.wxShare.share()
  },


}
</script>

<style lang="less">
.home{
  padding: 30px;
}
h2,p{
  margin-bottom: 10px;
}
</style>
