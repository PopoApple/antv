<template>
  <a-form :form="form" class="album-manage-edit-form">
    <a-form-item v-bind="formItemLayout" label="专辑名称">
      <b-input
        v-decorator="['name', { rules: [{ required: true, message: '请输入专辑名称' }] }]"
        placeholder="请输入专辑名称"
        :maxlength="30"
        :show-counter="true"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="专辑简介">
      <b-textarea
        v-decorator="['desc', { rules: [{ required: true, message: '请输入专辑简介' }] }]"
        placeholder="请输入文本内容" 
        :rows="4" 
        :show-counter="true"
        :maxlength="100"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="专辑封面">
      <upload-avatar
        btnTxt="上传封面"
        btnTxtHasImg="修改封面"
        uploadUrl="http://127.0.0.1:3000"
        v-decorator="['cover', { rules: [{ required: true, message: '请上传专辑封面' }] }]" 
      />
      <div class="upload-tips">
        尺寸：200*200px 格式：jpg 图片大小：5M以内
      </div>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="专辑有效期">
      <a-date-picker 
        v-decorator="['endTime']" 
        placeholder="选择专辑结束时间"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="自定义标签">
      <editable-tags 
        v-decorator="['tags']" 
      />
    </a-form-item>
  </a-form>
</template>
<script src="./index.js"></script>
<style lang="less">
  @import 'index.less';
</style>