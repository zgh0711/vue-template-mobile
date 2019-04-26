<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    async mounted () {
      this.wxShare.share()
    },
    methods: {
    
    },
    
  }
</script>
