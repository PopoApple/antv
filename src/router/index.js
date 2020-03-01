import Vue from 'vue'
import Router from 'vue-router'
import Store from '../common/js/store'
import { queryString } from '../common/js/utils'
import { Config } from '../config'

const ContentManage = () => import('../pages/main/ContentManage/index.vue')
const AlbumManage = () => import('../pages/main/albumManage/Index.vue')
const Home = () => import('../pages/main/home/Index.vue')

// 404
const NotFound = () => import('../pages/main/exception/NotFound.vue')
const Exception = () => import('../pages/main/exception/Exception.vue')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/', redirect: {name: 'home'}},
    { path: '/home', name: 'home', component: Home },
    { path: '/ContentManage', name: 'ContentManage', component: ContentManage },
    { path: '/albumManage', name: 'albumManage', component: AlbumManage },
    { path: '/exception/:failType', name: 'exception', component: Exception },
    { path: '*', name: 'notFound', component: NotFound }
  ]
})
router.beforeEach((to, from, next) => {
  let accessToken = queryString('accessToken')
  let accessTokenStore = Store.get('accessToken')
  if (accessToken) {
    Store.set('accessToken', accessToken)
    window.location.href = Config.url.entry
  } else {
    // sdk没有获取到token，跳转到错误页
    if (!accessTokenStore) {
      window.location.href = Config.url.nologin
    }
  }
  next()
})
export default router
