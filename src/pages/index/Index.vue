<template>
  <div class="page" id="index">
    <!--页面头部-->
    <Header></Header>
    <!-- 登陆框面板 -->
    <div class="login-pannel clearfix">
        <div class="login-form">
            <iframe id="udb_login" scrolling="no" width="310" height="314" frameborder="0" allowtransparency="true" src="/udb/udb_login.jsp?pageId=1&redirectURL=/main.action"></iframe>
        </div>
    </div>
    <div id="J_bgCon" class="lg-bg">
        <img src="../../common/image/blank.gif">
    </div>
    <div class="lg-bg lg-bg-adv" id="J_advBgCon">
        <div class="slide-container" id="J_SlideContainer">
            <img src="../../common/image/blank.gif">
        </div>
    </div>
    <!-- 页面底部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import { Config } from '@/config.js'
import { queryString } from '@/common/js/utils'
import Store from '@/common/js/store'
import Footer from '@/components/footer/Footer'
import Header from '../../components/header/Header'

export default {
  name: 'Index',
  components: {
    Footer,
    Header
  },
  data: function() {
    return {}
  },
  created: function() {
    let accessToken = queryString('accessToken')
    let accessTokenStore = Store.get('accessToken')
    if (accessToken) {
      Store.set('accessToken', accessToken)
      this.$loading.hide()
      window.location.href = Config.url.entry
    } else {
      //sdk没有获取到token，跳转到错误页
      if(accessTokenStore) {
        window.location.href = Config.url.entry
      }  
    }
  },
  mounted(){
  },
  methods:{

  }
    
}
</script>
<style lang="less"  scoped>
  @import url('./index.less');
</style>

