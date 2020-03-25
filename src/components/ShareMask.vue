<template>
  <transition name="van-fade">
    <div class="shareMask" @click="closeMask" v-if="shareMask.show">
      <div class="mask" />
      <img class="shareArrow" src="../assets/img/img_share_arrow.png" alt="">
      <p>点击右上角分享</p>
    </div>
  </transition>
</template>

<script>

/**
   * 分享蒙层组件，只需要传入一个 shareMask 对象即可
   * shareMask:{
          show:false
        },
   */
export default {
  name: 'ShareMask',
  props: {
    shareMask: {
      type: Object,
      require: true
    }
  },
  watch: {
    'shareMask.show': function () {
      if (this.shareMask.show) {
        this.myUtils.forbidBodyScroll()
      } else {
        this.myUtils.allowBodyScroll()
      }
    }
  },

  methods: {
    closeMask() {
      this.shareMask.show = false
      this.myUtils.allowBodyScroll()
    }
  }
}
</script>

<style lang="less" scoped>
  .shareMask{
    .mask{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: 100%;
      opacity: .6;
      background: #000;
    }
    .shareArrow{
      z-index: 10;
      width: 1.5rem;
      height: 1.1rem;
      position: fixed;
      top: .48rem;
      right: .56rem;
    }

    p{
      z-index: 10;
      color: white;
      font-size: .32rem;
      position: fixed;
      top: 1.8rem;
      right: 1.9rem;
    }
  }
</style>
