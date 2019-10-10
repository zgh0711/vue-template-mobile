<template>
  <div class="con-dialog-base">
    <div class="dialog">
      <slot name="dialog"></slot>
    </div>
  </div>
</template>

<script>
  /**
   * BaseDialog组件，可以这dialog永远居中
   */
  export default {
    name: 'BaseDialog',
  }
</script>

<style lang="less" scoped>
  .con-dialog-base {
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    font-size: 0;
    text-align: center;
    white-space: nowrap;
    background-color: rgba(0,0,0,.5);
  }
  
  .con-dialog-base:after {
    height: 100%;
    content: '';
    display: inline-block;
    vertical-align: middle;
  }
  
  .dialog {
    display: inline-block;
    white-space: normal;
    vertical-align: middle;
  }
</style>
