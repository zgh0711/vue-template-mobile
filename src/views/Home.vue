<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
  </div>
</template>

<script>
  
  export default {
    name: 'home',
    components: {},
    async mounted () {
      this.wxShare.share()
    },
    methods: {
    
    },
    
  }
</script>
