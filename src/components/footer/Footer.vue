<template>
  <div class="footer">
      页面底部
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data: function() {
    return {
    }
  },
  created: function() {
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.footer {
  background: red;
  position: absolute;
  left: 50%;
  margin-left: -500px;
  bottom: 0;
  height: 100px;
  width: 1010px;
  line-height: 100px;
  text-align: center;
  a {
    color: #999;
  }
  .sns {
    display: inline-block;
    height: 60px;
    vertical-align: top;
  }
  .copyright {
    display: inline-block;
    .line {
      // float: left;
      margin-bottom: 10px;
      height: 20px;
      line-height: 20px;
      .text {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: top;
      }
    }
  }
  .login-icons-ct, .login-icons-ctyun, .login-icons-certification, .login-icons-ipv6 {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    margin-right: 5px;
  }
  .login-icons-certification {
    margin: 0 10px 0 5px;
  }
  .login-icons-ipv6 {
    margin: 0 10px 0 5px;
  }
}

.login-icons-weibo,
.login-icons-weixin,
.login-icons-yixin {
  float: left;
  margin-right: 25px;
}
.login-icons-weixin,
.login-icons-yixin {
  position: relative;
  cursor: pointer;
  img {
    display: none;
    position: absolute;
    bottom: 55px;
    left: 0px;
  }
  &:hover img {
    display: block;
  }
}
</style>