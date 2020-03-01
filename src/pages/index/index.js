import Vue from 'vue'
import Antd from 'ant-design-vue';
import Index from './Index.vue'
import 'ant-design-vue/dist/antd.css';
import { coverWriteLog } from '@/common/js/utils'

// 生产环境重写console.log方法
coverWriteLog()

Vue.use(Antd)

new Vue({
  render: h => h(Index)
}).$mount('#entry-box')