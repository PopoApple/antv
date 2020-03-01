<template>
  <div>
    <i class="iconfont icon-icon_back back" @click="handleBack"></i>
    <img class="exception-img" :src="exceptionImg" alt="发生错误">
    <p class="tip">发生错误</p>
  </div>
</template>
<script>

import { queryString } from '@/common/js/utils'

export default {
  name: 'ServerError',
  data: function() {
    return {
      exceptionImg: require('@/common/image/exception/sever_fail.png')
    }
  },
  created: function() {
    this.handleError()
  },
  methods: {
    handleError: function() {
      let errorCode = queryString('errorCode')
    },
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