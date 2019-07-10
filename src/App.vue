<template>
  <div id="app" class="flex-col con-app">
    <!--缓存想要缓存的页面，实现后退不刷新-->
    <!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面-->
    <transition name="van-fade">
      <keep-alive>
        <router-view class = "f1" v-if = "$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="van-fade">
      <router-view class = "f1" v-if = "!$route.meta.keepAlive"></router-view>
    </transition>

    <div class="iphoneX"></div>
    <AppNavBar class="bar-nav-app"></AppNavBar>
  </div>
</template>

<script>
  import AppNavBar from '@/components/AppNavBar'
  
  export default {
    name: 'App',
    components: {AppNavBar},
  }
</script>

<style lang="less" scoped>
  .con-app{
    min-height: 100vh;
    .bar-nav-app{
      width: 100%;
      bottom: 0;
      position: fixed;
      margin-bottom: constant(safe-area-inset-bottom);
      margin-bottom: env(safe-area-inset-bottom);
    }
  }
</style>
