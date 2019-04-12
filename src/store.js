import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theFirstLink: '',
  },
  mutations: {
    setTheFirstLink (state, url) {
      state.theFirstLink = url
    },
  },
  actions: {},
})
