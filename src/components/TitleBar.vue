<template>
  <header class="con-bar-title flex-row" :class="{'fixed': fixed}">
    <div class="left" v-if="goBack" @click="$router.go(-1)">返回</div>
    <div class="left" v-if="!goBack || left1 || right1">
      <slot name="left"></slot>
    </div>
    <div class="left" v-if="left2 || right2">
      <slot name="left2"></slot>
    </div>
    
    <h1 class="f1 center oneLine" v-if="title" v-text="title"></h1>
    <div class="f1 center oneLine" v-else>
      <slot name="center"></slot>
    </div>
  
    <div class="right" v-if="left2 || right2">
      <slot name="right2"></slot>
    </div>
    <div class="right" v-if="goBack || !goBack || left1 || right1">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
  /**
   * TitleBar组件，可以设置左右各二个按钮，左边第一个默认为返回按钮，中间标题默认传文字就行，也可以自定义内容，还可以设置吸顶
   * 使用时只需要根据需要传相应的值即可，可以使用的属性见 props，其中 left1，left2，right1，right2 要用的话需要使用对应的 slot
   * 需要注意的一点就是 left1 和 goBack 属性不要同时存在，同时存在的话会导致标题不能居中
   * 使用示例如下：
   * <TitleBar title="title" fixed left2 goBack>
        <div slot="left" @click="$router.push('/home')">left1</div>
        <div slot="left2" @click="$router.go(-1)">left2</div>
     </TitleBar>
   *
   * TitleBar 这种组件基本每个页面都需要用到，所以需要全局注册，在 main.js 中通过二步来进行全局注册
   * 1，import 组件，如：import TitleBar from '@/components/TitleBar'
   * 2，Vue.component 初始化组件 如：Vue.component('TitleBar', TitleBar)
   *
   * 也可以使用 webpack 的动态导入功能来延迟加载组件
   * Vue.component('titleBar', () => import ('./components/TitleBar'))
   */
  export default {
    name: 'TitleBar',
    props: {
      title: null,
      left1: Boolean,
      left2: Boolean,
      right1: Boolean,
      right2: Boolean,
      fixed: Boolean,
      goBack: Boolean,
    },
  }
</script>

<style lang="less" scoped>
  .fixed{
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
  }
  .con-bar-title {
    color: white;
    height: 96px;
    line-height: 96px;
    text-align: center;
    background: #1FA2FF;
    .left{
      width: 96px;
      font-size: 28px;
    }
    .right{
      width: 96px;
      font-size: 28px;
    }
    .center{
      padding: 0 20px;
      font-size: 40px;
    }
  }
  

</style>
