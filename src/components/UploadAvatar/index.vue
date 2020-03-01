<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    :class="['UploadAvatar', { 'UploadAvatar-has-img': !!value }]"
    :showUploadList="false"
    :action="uploadUrl"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="value" :src="value" />
    <div class="UploadAvatar-btn">
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">{{ value ? btnTxtHasImg : btnTxt }}</div>
    </div>
  </a-upload>
</template>
<script>
  export default {
    name: 'UploadAvatar',
    props: {
      btnTxt: String,
      btnTxtHasImg: String,
      value: String,
      uploadUrl: String,
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      handleChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true
          return
        }
        if (info.file.status === 'done') {
          this.loading = false
          this.$emit('change', info.file.response)
        }
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        if (!isJPG) {
          this.$message.error('只能上传jpg格式的图片')
        }
        const isNoMoreThan5M = file.size / 1024 / 1024 <= 5
        if (!isNoMoreThan5M) {
          this.$message.error('图片大小不能超过5M')
        }
        return isJPG && isNoMoreThan5M
      },
    },
  };
</script>
<style lang="less">
  .UploadAvatar {
    &.UploadAvatar-has-img {
      .ant-upload.ant-upload-select-picture-card {
        border: none;
        .UploadAvatar-btn {
          background: rgba(27,24,24,0.70);
          .ant-upload-text {
            color: #fff; 
          }
          i {
            color: #fff;
          }
        }
      }
    }
    .ant-upload.ant-upload-select-picture-card {
      display: table;
      width: 120px;
      height: 120px;
      border: 1px dashed rgba(0,0,0,0.15);
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .UploadAvatar-btn {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        background: rgba(0,0,0,0.02);
        .ant-upload-text {
          margin-top: 6px;
          color: #4A4A4A; 
        }
        i {
          font-size: 30px;
          color: #888;
          margin-top: 30px;
        }
      }
    }
  }
</style>