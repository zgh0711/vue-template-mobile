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
  
    <div class="iphoneX-adapt"></div>

    <!--底部导航的占位高度-->
    <div v-show="showAppBar" class="placeholder-bar-nav-app"></div>
    <AppNavBar v-show="showAppBar" class="bar-nav-app iphoneX"></AppNavBar>
  </div>
</template>

<script>
  import AppNavBar from '@/components/AppNavBar'
  
  export default {
    name: 'App',
    components: {AppNavBar},
    computed: {
      showAppBar () {
        let showList = ['home','mine']
        return showList.includes(this.$route.name)
      },
    },
    
    created () {
      //将 vue 实例传递给 axios，在拦截器里面可能会用到
      this.apis.public.setVueObject(this)
    }
  }
</script>

<style lang="less" scoped>
  .con-app{
    min-height: 100vh;
    .bar-nav-app{
      width: 100%;
      bottom: 0;
      z-index: 1000;
      position: fixed;
    }
    .placeholder-bar-nav-app{
      height: 96px;
    }
  }
</style>
