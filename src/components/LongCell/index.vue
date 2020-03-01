<template>
  <div :class="['LongCell', { 'LongCell-overflow': isOverflow }]" ref="wrap">
    <div class="inner" ref="inner">
      <slot></slot>
    </div>
    <a-popover v-if="isOverflow">
      <template slot="content">
        <slot></slot>
      </template>
      <div class="show" ref="show"><slot></slot></div>
    </a-popover>
    <template v-else>
      <div class="show" ref="show"><slot></slot></div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'LongCell',
  components: {},
  props: {},
  data() {
    return {
      width: 0,
      isOverflow: false,
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.updateStatus, false)
    this.updateStatus()
  },
  destroyed() {
    window.removeEventListener('resize', this.updateStatus)
  },
  computed: {},
  methods: {
    updateStatus() {
      this.isOverflow = this.$refs['inner'].offsetHeight > this.$refs['wrap'].offsetHeight
    },
  }
}
</script>
<style lang="less">
.LongCell {
  position: relative;
  height: 22px;
  overflow: hidden;
  .inner {
    opacity: 0;
  }
  .show {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>