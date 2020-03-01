<template>
  <div v-if="showCounter && maxlength !== undefined" :class="[{ 'BInput-focus': focus, 'BInput-show-counter': showCounter }]">
    <a-input v-bind="$attrs" v-on="counterInputListeners" :value="value" :maxlength="maxlength"></a-input>
    <div class="BInput-counter">{{ count }}/{{ maxlength }}</div>
  </div>
  <a-input v-else v-bind="$attrs" v-on="$listeners" :value="value" :maxlength="maxlength"></a-input>
</template>
<script>
export default {
  name: 'BInput',
  components: {},
  inheritAttrs: false,
  props: {
    maxlength: Number,
    showCounter: Boolean,
    value: String,
  },
  data() {
    return {
      focus: false,
      count: 0,
    }
  },
  created() {},
  mounted() {
  },
  watch: {
    value(val = '') {
      this.count = val.length 
    },
  },
  computed: {
    counterInputListeners: function () {
      return {
        ...this.$listeners,
        focus: e => {
          this.focus = true
          this.$emit('focus', e)
        },
        blur: e => {
          this.focus = false
          this.$emit('blur', e)
        },
      }
    }
  },
  methods: {},
}
</script>
<style lang="less">
  .BInput-show-counter {
      position: relative;
      padding-right: 42px;
      border: 1px solid #D9D9D9;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      margin: 3px 0;
    &.BInput-focus {
      border-color: #7088ff;
      box-shadow: 0 0 0 2px rgba(72, 96, 255, 0.2);
    }
    .BInput-counter {
      position: absolute;
      right: 10px;
      bottom: 0;
      color: #BFBFBF;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
    }
    .ant-input:focus {
      box-shadow: none;
    }
    input.ant-input {
      border: none;
      background: transparent;
      height: 30px;
    }
  }
</style>