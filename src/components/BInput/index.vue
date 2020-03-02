<template>
  <div v-if="showCounter && maxlength !== undefined" :class="[{ 'BInput-focus': focus, 'BInput-show-counter': showCounter }]">
    <a-input v-bind="$attrs" v-on="inputListeners" :value="value" :maxlength="maxlength"></a-input>
    <div class="BInput-counter">{{ count }}/{{ maxlength }}</div>
  </div>
  <a-input v-else v-bind="$attrs" v-on="inputListeners" :value="value" :maxlength="maxlength"></a-input>
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
    inputListeners: function () {
      let listeners = {
        ...this.$listeners,
        input: e => {
          this.$emit('input', e.target.value)
        },
      }
      if (this.showCounter) {
        listeners = {
          ...listeners,
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
      return listeners
    },
  },
  methods: {},
}
</script>
<style lang="less">
  .has-error .BInput-show-counter, .has-error .BInput-show-counter:hover {
    border-color: #f5222d;
  }
  .has-error .BInput-show-counter.BInput-focus {
    border-color: #ff4d4f;
    box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
  }
  .BInput-show-counter {
      position: relative;
      padding-right: 42px;
      border: 1px solid #D9D9D9;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
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
      position: relative;
      top: -1px;
    }
  }
</style>