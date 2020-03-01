<template>
  <a-layout class="app" id="app">
    <Menu :collapsed="collapsed"></Menu>
    <a-layout class="container">
      <Header :collapsed="collapsed" @collapse="collapse"/>
      <a-layout-content class="container">
        <!-- <transition name="fade"> -->
        <router-view></router-view>
        <!-- </transition> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Menu from '@/components/menu/Menu'
import Header from '@/components/header/Header'
export default {
  name: 'App',
  components: {
    Menu, Header
  },
  data() {
    return {
      collapsed: false
    }
  },
  created () {
    console.log('this', this.$route.name)
  },
  methods: {
    collapse(value) {
      this.collapsed = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less"> 
.app {
  height: 100%;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  overflow: hidden;
  .container{
    flex: 1;
  }
}
</style>
