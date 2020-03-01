<template>
  <a-layout-header class="header" ref="header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="collapse"
    />
    <span class="devide-line"></span>
    <a-dropdown v-model="menuOpen">
      <div class="user-info" :style="{'background-color': menuOpen ? '#F9F9F9' : null}">
        <div class="avatar" :style="{'background-image': `url(${headPortrait})`}"></div>
        <span class="user-name">用户名</span>
      </div>
      <a-menu slot="overlay" class="menu-wrap">
        <a-menu-item class="menu-item">
          <a href="javascript:;" class="menu-link">
            <a-icon type="logout" class="menu-icon" />
            退出登录
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </a-layout-header>
</template>
<script>
export default {
  name: 'Header',
  props: {
    collapsed: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  data() {
    return {
      headPortrait: require('../../common/image/sider/telecom-icon.png'),
      menuOpen: false,
    }
  },
  methods: {
    collapse() {
      this.$emit('collapse', !this.collapsed)
    },
  }
}
</script>
<style lang="less" scoped> 
.header {
  background: #fff;
  padding: 0 0 0 24px;
}
.devide-line {
  height: 16px;
  margin-left: 24px;
  border-left: 1PX solid #E8E8E8;
}
.user-info {
  float: right;
  padding-left: 32px;
  font-size: 14px;
  color: rgba(0,0,0,0.65);
  padding: 0 24px 0 12px;
  .avatar {
    background-repeat: no-repeat;
    background-size: 100%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
  }
  .user-name {
    vertical-align: middle;
  }
}
.menu-wrap {
  top: -5px;
  .menu-link {
    padding: 5px 70px 5px 12px;
    .menu-icon {
      margin-right: 4px;
    }
  }
}
</style>