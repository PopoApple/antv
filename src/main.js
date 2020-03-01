import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import { coverWriteLog } from '@/common/js/utils'
import VueLazyload from 'vue-lazyload'
// import { AlertPlugin, BusPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin, HammerPlugin, TransferDom } from 'plugins'
import router from './router'
import store from './store'
import filters from './filters'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.less'
import './common/less/override-antd.less'
import './common/less/index.less'

// 生产环境重写console.log方法
coverWriteLog()

Vue.config.productionTip = false

// Vue.use(BusPlugin) // 全局 bus 组件
// Vue.use(LoadingPlugin) // 全局 loading 组件
// Vue.use(AlertPlugin) // 全局 alert 组件
// Vue.use(ConfirmPlugin) // 全局 confirm 组件
// Vue.use(ToastPlugin) // 全局toast 组件
// Vue.use(HammerPlugin) // 全局hammer手势组件
// Vue.use(VueClipboard) // 全局文本复制插件
Vue.use(Antd)
Vue.use(VueLazyload)

Object.keys(filters).forEach(key => Vue.filter(key, filters[key])) // 定义全局过滤器

sync(store, router) // 将 vue-router 的 $route 同步至 vuex

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main-box')

window.app = app
