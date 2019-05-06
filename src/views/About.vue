<template>
  <div class="about">
    <h1>This is an about page</h1>
  
    <Debounce :time="300" events="click">
      <van-button @click="testDebounce" type="default">默认按钮</van-button>
    </Debounce>
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
      testDebounce () {
        console.log(new Date())
      },
    },
  
  }
</script>
