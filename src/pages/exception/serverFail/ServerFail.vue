<template>
  <div>
    <i class="iconfont icon-icon_back back" @click="handleBack"></i>
    <img class="exception-img" :src="exceptionImg" alt="服务器繁忙">
    <p class="tip">服务器开小差了，请稍后再试</p>
  </div>
</template>
<script>
export default {
  name: 'ServerError',
  data: function() {
    return {
      exceptionImg: require('@/common/image/exception/sever_fail.png')
    }
  },
  methods: {
    handleBack() {
    }
  }
}
</script>
<style scoped>
  .back {
    margin-left: 20px;
    font-size: 24px;
  }
  .exception-img {
    display: block;
    margin: 100px auto 20px;
    width: 300px;
  }
  .tip {
    color: #999999;
    font-size: 14px;
    text-align: center;
  }
</style>