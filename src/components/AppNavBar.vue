<template>
  <div class="con-bar-nav-app flex-row">
    <router-link to="/home" class="f1 nav home" tag="div" active-class="home-active">
      <div class="text">首页</div>
    </router-link>
    
    <router-link to="/mine" class="f1 nav mine" tag="div" active-class="mine-active">
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
  }
</script>

<style lang="less" scoped>
  .con-bar-nav-app {
    height: 96px;
    background: white;
    .nav{
      position: relative;
      font-size: 22px;
      text-align: center;
      .text{
        left: 0;
        bottom: 0;
        width: 100%;
        height: 38px;
        position: absolute;
        line-height: 38px;
      }
    }
    
    .home{
      color: #262626;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 48px;
    }
    .mine {
      color: #262626;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 48px;
    }
    .home-active {
      color: #4398FF;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 48px;
    }
  
    .mine-active {
      color: #4398FF;
      background: url("../assets/img/logo.png") no-repeat center top 10px;
      background-size: 48px;
    }
  }
</style>
