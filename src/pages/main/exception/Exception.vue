<template>
  <div class="container">
    <img :src="currentFail.img" class="img" alt="错误状态图片">
    <p class="text" v-html="currentFail.text"></p>
    <div class="btn" v-text="currentFail.btn" @click="handleClick"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Store from 'common/js/store'
export default {
  name: 'exception',
  components: {},
  data() {
    return {
      failTypeList: {
        severFail: {
          img: require('../../../common/image/exception/sever_fail.png'),
          text: '服务器开小差了，请稍后再试',
          btn: '点击重试'
        }
      },
      currentFail: {}
    }
  },
  computed: {},
  created() {
    this.dealExeption(this.$route.params.failType)
  },
  methods: {
    dealExeption(failType) {
      this.currentFail = this.failTypeList[failType]
    },
    handleClick() {
      
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  .img {
    display: block;
    height: 200px;
    margin: 0 auto;
    margin-top: 91px;
  }
  .text {
    font-size: 12px;
    color: #4E525E;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 18px;
  }
  .btn {
    width: 140px;
    height: 38px;
    line-height: 36px;
    margin: 0 auto;
    border: 1PX solid #0087FF;
    border-radius: 19px;
    font-size: 16px;
    font-weight: bold;
    color: #0087FF;
    text-align: center;
  }
}
</style>