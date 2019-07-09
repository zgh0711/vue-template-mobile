<template>
  <div class="con-bar-nav-app flex">
    <router-link to="/home" class="f1 nav home" tag="div" active-class="home-active">
      <div class="text">首页</div>
    </router-link>
    
    <router-link to="/agreement" class="f1 nav mine" tag="div" active-class="mine-active">
      <div class="text">我的</div>
    </router-link>
  </div>
</template>

<script>
  /**
   * AppNavBar组件
   */
  export default {
    name: 'AppNavBar',
    data () {
      return {}
    },
    
    mounted () {
    
    },
  }
</script>

<style lang="less" scoped>
  .con-bar-nav-app {
    height: 96px;
    background: #1FA2FF;
    text-align: center;
    line-height: 96px;
    .nav{
      position: relative;
      font-size: 24px;
      text-align: center;
      text-decoration: none;
      .text{
        left: 0;
        bottom: 6.4px;
        width: 100%;
        height: 40px;
        position: absolute;
        text-align: center;
        line-height: 40px;
      }
    }
    
    .home{
      color: #666666;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 40px;
    }
    .mine {
      color: #666666;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 40px;
    }
    .home-active {
      color: #FFFFFF;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 40px;
    }
  
    .mine-active {
      color: #FFFFFF;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 40px;
    }
  }
</style>
