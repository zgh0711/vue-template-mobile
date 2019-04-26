<template>
  <div class="about">
    <h1>This is an about page</h1>
  
    <van-button @click="click" type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    async mounted () {
      this.wxShare.share()
    },
    methods: {
      click () {
        alert(111111111111)
      },
    },
  
  }
</script>
