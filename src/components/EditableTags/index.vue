<template>
  <div class="EditableTags">
    <template v-for="tag in tags">
      <a-tooltip v-if="tag.length > 20" :key="tag.key" :title="tag.text">
        <a-tag :key="tag.key" :closable="true" :afterClose="() => handleClose(tag.key)">
          {{`${tag.text.slice(0, 20)}...`}}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag.key" :closable="true" :afterClose="() => handleClose(tag.key)">
        {{tag.text}}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputEnter"
    />
    <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
      <a-icon type="plus" /> 标签
    </a-tag>
  </div>
</template>
<script>
let key = 1
export default {
    name: 'EditableTags',
    props: {
      value: Array,
      allowRepeat: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        tags: [],
      }
    },
    watch: {
      value(value = []) {
        const val = this.allowRepeat ? [ ...value ] : [ ...new Set(value) ]
        if (this.tags.length !== val.length || this.tags.some((d, i) => d.text !== val[i])) {
          this.tags = val.map(d => {
            return { key: key++, text: d }
          })
        }
      },
    },
    methods: {
      handleClose(removedTag) {
        this.tags = this.tags.filter(tag => tag.key !== removedTag)
        this.trggerChange()
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(function() {
          this.$refs.input.focus()
        })
      },
      handleInputChange(e) {
        this.inputValue = e.target.value
      },
      handleInputEnter() {
        this.$refs.input.blur()
      },
      handleInputConfirm() {
        let tags = [ ...this.tags ]
        if (this.inputValue && (this.allowRepeat || this.tags.indexOf(this.inputValue === -1))) {
          tags = [ ...this.tags, { key: key++, text: this.inputValue } ]
        }
        Object.assign(this, {
          tags,
          inputVisible: false,
          inputValue: '',
        })
        this.trggerChange()
      },
      trggerChange() {
        this.$emit('change', this.tags.map(d => d.text))
      },
    },
  }
</script>
<style lang="less">
  .EditableTags {
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    margin: 3px 0;
    padding: 0 10px 0;
    overflow: hidden;
    .ant-tag {
      font-size: 12px;
      height: 22px;
      padding: 0 8px;
      line-height: 22px;
      display: block;
      float: left;
      margin: 4px 10px 4px 0;
    }
    .ant-input {
      margin: 4px 10px 4px 0;
      display: block;
      height: 22px;
      line-height: 22px;
    }
  }
</style>