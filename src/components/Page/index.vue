<template>
  <div class="Page">
    <div class="Page-content">
      <slot></slot>
      <div v-if="loading" class="Page-loading-wrap">
        <div class="Page-loading">
          <a-spin />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Page',
  components: {},
  props: {
    loading: Boolean,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {}
}
</script>
<style lang="less">
.Page {
  background-color: #eff3f9;
  .Page-content {
    background: #fff;
    border-radius: 8px;
    padding: 0 32px 16px;
    margin: 24px;
    min-height: ~'calc(100vh - 112px)';
    position: relative;
    overflow: hidden;
  }
  .Page-loading-wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
    z-index: 999;
    .Page-loading {
      text-align: center;
      margin-top: ~'calc((100vh - 116px) / 2 - 20px)';
    }
  }
}
</style>