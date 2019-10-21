<template>
  <transition name="van-fade">
    <div class="confirmDialog" @click="closeMask" v-if="confirmDialog.show">
      <div class="mask"></div>
      
      <div class="dialogCon">
        <h5 v-if="confirmDialog.title">title</h5>
        <p class="msg van-hairline--bottom" v-if="confirmDialog.msg">{{confirmDialog.msg}}</p>
        <div class="flex-row">
          <button @click="confirmDialog.cancelAction" class="f1 btn-cancel">{{confirmDialog.cancelText}}</button>
          <button @click="confirmDialog.confirmAction" class="f1 btn-confirm">{{confirmDialog.confirmText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  /**
   * 带确认取消按钮的对话框组件，需要传入 confirmDialog 对象，如
   * confirmDialog:{
          show:false,
          msg:'投票不可取消，仅一次投票机会',
          cancelText:'取消',
          confirmText:'投票',
          cancelAction:()=>{
            this.confirmDialog.show = false
          },
          confirmAction:()=>{
            this.confirmAction()
          }
        }
   */
  export default {
    name: 'ConfirmDialog',
    props: {
      confirmDialog: {
        type: Object,
        require: true,
      },
    },
    watch: {
      'confirmDialog.show' () {
        if (this.confirmDialog.show) {
          this.myUtils.forbidBodyScroll()
        } else {
          this.myUtils.allowBodyScroll()
        }
      },
    },
  
    mounted () {
      this.myUtils.forbidBodyScroll()
    },
    
    methods: {
      closeMask () {
        this.confirmDialog.show = false
        this.myUtils.allowBodyScroll()
      },
    },
  }
</script>

<style lang="less" scoped>
  .confirmDialog{
    .mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      opacity: .6;
      background: #000;
    }
    
    .dialogCon{
      top: 30%;
      width: 80%;
      margin: 0 10%;
      z-index: 10;
      position: fixed;
      background: white;
      border-radius: 8px;
      h5{
        height: 60px;
        line-height: 60px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
      }
      .msg{
        height: 160px;
        line-height: 160px;
        color: #666666;
        font-size: 32px;
        text-align: center;
      }
      .btn-cancel{
        height: 100px;
        color: #666666;
        font-size: 32px;
      }
      .btn-confirm{
        height: 100px;
        color: #1EAB42;
        font-size: 32px;
      }
    }
  }
</style>
