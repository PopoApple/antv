import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'
// modules
// import imageViewer from './modules/image-viewer'

Vue.use(Vuex)

const debug = process && process.env && process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: { 
    // imageViewer
 },
  strict: debug,
  // plugins: [createPersistedState({
  //   paths: ['filePath']
  // })]
})