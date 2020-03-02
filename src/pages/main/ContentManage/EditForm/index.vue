<template>
  <a-form :form="form" class="content-manage-edit-form">
    <a-form-item label="内容名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
      <b-input
        v-decorator="['name', { rules: [{ required: true, message: '请输入内容名称' }] }]"
        placeholder="请输入内容名称"
        :maxlength="30"
        :show-counter="true"
      />
    </a-form-item>
    <a-form-item label="内容简介" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
      <b-textarea
        v-decorator="['desc', { rules: [{ required: true, message: '请输入内容简介' }] }]"
        placeholder="请输入内容简介" 
        :rows="4" 
        :show-counter="true"
        :maxlength="100"
      />
    </a-form-item>
    <a-form-item v-if="!record"
      style="margin-bottom: 16px;" 
      label="内容上传" 
      :label-col="{ span: 5 }" 
      :wrapper-col="{ span: 16 }"
      :validate-status="fileError ? 'error' : 'success'"
      :help="fileError"
      :required="true"
    >
      <div class="dropbox">
        <a-upload-dragger
          v-decorator="[
            'file',
            {
              valuePropName: 'fileList',
              getValueFromEvent: getFileValue,
            },
          ]"
          action="http://127.0.0.1:3000/"
          :showUploadList="false"
          accept=".mp3, .aac, .ogg, .wav, .png, .jpg"
          :beforeUpload="beforeUpload"
        >
          <div class="upload-icon">
            <a-icon type="plus" />
          </div>
          <div class="upload-text">
            上传附件
          </div>
          <div class="upload-hint">
            支持添加mp3/aac/ogg/wav格式的音频，
          </div>
          <div class="upload-hint">
            单个文件大小不超过1G
          </div>
        </a-upload-dragger>
      </div>
      <div v-if="file" class="file-wrap">
        <div class="file-item">
          <div :class="`file-icon file-icon-${file.type}`"></div>
          <div class="file-name">{{ file.name }}</div>
          <div :class="`file-btn file-btn-${file.status}`" @click="fileBtnClick"></div>
          <div v-if="file.status === 'uploading'" class="file-progress">{{ `${Math.round(file.percent)}%` }}</div>
        </div>
      </div>
    </a-form-item>
  </a-form>
</template>
<script src="./index.js"></script>
<style lang="less">
    .content-manage-edit-form {
      margin-left: 10px;
      .ant-form-item-label {
          text-align: left;
      }
      .ant-upload.ant-upload-drag .ant-upload {
        padding: 12px 0;
      }
      .has-error {
        .ant-upload.ant-upload-drag {
          border-color: #f5222d;
        }
      }
    }
</style>
<style lang="less" scoped>
   @import 'index.less';
</style>