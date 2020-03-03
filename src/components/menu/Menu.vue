<template>
  <a-layout-sider class="app-sider" :style="{flex: '0 0 '+ siderWidth, maxWidth: siderWidth, minWidth: siderWidth, width: siderWidth}" :trigger="null" collapsible v-model="collapsed">
    <div class="logo">
      <span class="title">
        内容合作开放平台
      </span>
    </div>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys">
      <a-menu-item
        v-for="item in menuList"
        :key="item.url"
        @click="handleClick"
        class="menu-item"
      >
      
        <div class="menu-item-icon menu-item-icon-default" :style="{'background-image': `url(${item.defaultIcon})`}"></div>
        <div class="menu-item-icon menu-item-icon-selected" :style="{'background-image': `url(${item.selectedIcon})`}"></div>
        <span class="menu-item-desc">{{item.desc}}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: 'Menu',
  props: {
    collapsed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      menuList: [
        {
          desc: '首页',
          defaultIcon: require('../../common/image/sider/home.png'),
          selectedIcon: require('../../common/image/sider/home-hover.png'),
          url: '/home'
        }, {
          desc: '专辑管理',
          defaultIcon: require('../../common/image/sider/album-manage.png'),
          selectedIcon: require('../../common/image/sider/album-manage-hover.png'),
          url: '/albumManage'
        }, {
          desc: '内容管理',
          defaultIcon: require('../../common/image/sider/content-manage.png'),
          selectedIcon: require('../../common/image/sider/content-manage-hover.png'),
          url: '/ContentManage'
        }
      ],
      selectedKeys: [],
    }
  },
  watch: {
    '$route'(to, from) {
      this.selectedKeys = [to.path]
    }
  },
  computed: {
    // 侧边栏宽度
    siderWidth() {
      if(this.collapsed)
        return '80px'
      else
        return '256px' // '17.8%'
    }
  },
  methods: {
    handleClick(e) {
      this.$router.push({ path: e.key })
    }
  }
}
</script>
<style lang="less">
.app-sider {
  .logo {
    width: 100%;
    height: 64px;
    margin-bottom: 8px;
    padding-left: 68px;
    overflow: hidden;
    line-height: 64px;
    font-size: 18px;
    color: #FFFFFF;
    background: #002766 url('../../common/image/sider/telecom-icon.png') 28px 17px no-repeat;
  }
  .title {
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .menu-item {
    padding-left: 40px !important;
    text-overflow: initial;
    .menu-item-icon {
      width: 26px;
      height: 54px;
      background-repeat: no-repeat;
      background-position: 0 20px;
      background-size: 14px 14px;
    }
    .menu-item-desc {
      display: inline-block;
      height: 54px;
      vertical-align: top;
      transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      max-width: 180px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .ant-menu-item {
    height: 54px !important;
    margin: 0 !important;
    line-height: 54px !important;
    color: #88919B !important;
    .menu-item-icon-default {
      display: inline-block;
    }
    .menu-item-icon-selected {
      display: none;
    }
  }
  .ant-menu-item-active, .ant-menu-item-selected {
    color: #FFFFFF !important;
    .menu-item-icon-default {
      display: none;
    }
    .menu-item-icon-selected {
      display: inline-block;
    }
  }
  &.ant-layout-sider-collapsed {
    .title {
      opacity: 0;
    }
    .ant-menu-inline-collapsed {
      .menu-item {
        padding-left: 32px !important;
      }
      .menu-item-desc {
        opacity: 0;
      }
    }
  }
}
</style>