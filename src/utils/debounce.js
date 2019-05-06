/**
 * 防抖组件，使用前在 main.js 里面全局引用一下即可，如： import './utils/debounce'
 * 使用时只需要传入两个参数 time 和 events 即可，如：
 *  <Debounce :time="300" events="click">
      <div @click="test" class="test">btn</div>
    </Debounce>
 * time 为我们需要设置的防抖的时间，events 为触发防抖的事件类型
 */


import Vue from 'vue'

const debounce = (func, time, ctx) => {
  let timer
  const rtn = (...params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(ctx, params)
    }, time)
  }
  return rtn
}

Vue.component('Debounce', {
  abstract: true,
  props: ['time', 'events'],
  created () {
    this.eventKeys = this.events.split(',')
    this.originMap = {}
    this.debouncedMap = {}
  },
  render() {
    const vnode = this.$slots.default[0]
    
    this.eventKeys.forEach((key) => {
      const target = vnode.data.on[key]
      if (target === this.originMap[key] && this.debouncedMap[key]) {
        vnode.data.on[key] = this.debouncedMap[key]
      } else if (target) {
        this.originMap[key] = target
        this.debouncedMap[key] = debounce(target, this.time, vnode)
        vnode.data.on[key] = this.debouncedMap[key]
      }
    })
    
    return vnode
  },
})
