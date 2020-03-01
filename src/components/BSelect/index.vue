<template>
  <a-select v-bind="$attrs" v-on="$listeners">
    <a-select-option v-for="item in dict" :key="item.val" :value="item.val">{{ item.text }}</a-select-option>
  </a-select>
</template>
<script>
export default {
  name: 'BSelect',
  components: {},
  inheritAttrs: false,
  props: {
    dict: {
      type: Array,
      default: [],
    },
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
<style lang="less" scoped>

</style>