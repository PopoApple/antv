<template>
  <div v-if="showCounter && maxlength !== undefined" :class="[{ 'BTextarea-focus': focus, 'BTextarea-show-counter': showCounter }]">
    <a-textarea v-bind="$attrs" v-on="inputListeners" :maxlength="maxlength" :value="value"></a-textarea>
    <div class="BTextarea-counter">{{ count }}/{{ maxlength }}</div>
  </div>
  <a-textarea v-else v-bind="$attrs" v-on="inputListeners" :maxlength="maxlength" :value="value"></a-textarea>
</template>
<script>
export default {
  name: 'BTextarea',
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
  watch: {
    value(val = '') {
      this.count = val.length 
    },
  },
  created() {},
  mounted() {},
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
  .has-error .BTextarea-show-counter {
    border-color: #f5222d;
  }
  .has-error .BTextarea-show-counter.BTextarea-focus {
    border-color: #ff4d4f;
    box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
  }
  .BTextarea-show-counter {
    position: relative;
    padding-bottom: 28px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
      margin: 3px 0;
    &.BTextarea-focus {
      border-color: #7088ff;
      box-shadow: 0 0 0 2px rgba(72, 96, 255, 0.2);
    }
    .BTextarea-counter {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #BFBFBF;
      font-size: 12px; 
      height: 12px;
      line-height: 12px;
    }
    .ant-input:focus {
      box-shadow: none;
    }
    textarea.ant-input {
      border: none;
      resize: none;
    }
  }
</style>