<!--获取验证码组件-->

<template>
  <div>
    <div @click="getVerify" class="unClick" v-if="!isClick">获取验证码</div>
    <div class="clicked" v-if="isClick">{{ time }}s</div>
  </div>
</template>

<script>
export default {
  name: 'GetVerify',
  props: {
    mobile: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      isClick: false,
      time: 0
    }
  },
  methods: {
    getVerify() {
      if (this.myUtils.isNull(this.mobile)) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.myUtils.isPhoneNum(this.mobile)) {
        this.$toast('您输入的手机号码格式不正确，请重新输入')
        return
      }

      this.$emit('send')
      this.isClick = true
      this.time = 60
      const limitTime = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          this.isClick = false
          clearInterval(limitTime)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .unClick {
    font-size: .28rem;
    color: #1FA2FF;
  }

  .clicked {
    font-size: .28rem;
    color: #7B7F8A;
  }
</style>
