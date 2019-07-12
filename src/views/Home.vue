<template>
  <div class="home">
    
    <van-swipe :autoplay="3000" indicator-color="black" style="background: #1FA2FF;text-align: center">
      <van-swipe-item @click="clickItem(1)">
        <img alt="Vue logo" src="../assets/img/logo.png">
      </van-swipe-item>
      <van-swipe-item @click="clickItem(2)">
        <img alt="Vue logo" src="../assets/img/logo.png">
      </van-swipe-item>
      <van-swipe-item @click="clickItem(3)">
        <img alt="Vue logo" src="../assets/img/logo.png">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  
  export default {
    name: 'home',
    async mounted () {
      this.wxShare.share()
    },
    methods: {
      clickItem(num){
        this.$toast(num)
      }
    },
    
  }
</script>
