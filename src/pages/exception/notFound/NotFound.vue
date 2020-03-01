<template>
  <div>
    <i class="iconfont icon-icon_back back" @click="handleBack"></i>
    <img class="exception-img" :src="exceptionImg" alt="资源未找到">
    <p class="tip">抱歉，您访问的页面地址有误，或者该页面不存在。</p>
  </div>
</template>
<script>
export default {
  name: 'NotFound',
  data: function() {
    return {
      exceptionImg: require('@/common/image/exception/not_found.png')
    }
  },
  methods: {
    handleBack() {
    }
  },
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