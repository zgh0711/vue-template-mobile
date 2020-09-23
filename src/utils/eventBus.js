/**
 * eventBus,事件总线，可以在任意组件之间实现事件通信
 * 使用方法，使用下面的两行代码即可创建一个 eventBus，创建好以后在 main,js 中引入
 * 并通过 Vue.prototype.bus = bus 将 eventBus 挂载到 vue 的原型上就可以全局使用 eventBus 了
 *
 * 发送事件：在触发事件的地方使用 $emit 来发送事件
 * this.bus.$emit(‘事件名’,eventData)
 *
 * 接收事件：在需要接收事件的地方使用 $on 来接收事件
 * this.bus.$on(‘事件名’,(eventData)=>{
      console.log(eventData)
   })
 *
 * 注销事件：$emit 定义的事件必须要在组件销毁之前注销，不然事件会一直触发
 * beforeDestroy() {
     this.bus.$off(‘事件名’);
   },
 */
import Vue from 'vue'

export default new Vue
