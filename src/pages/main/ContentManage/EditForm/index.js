import BInput from '@/components/BInput/index.vue'
import BTextarea from '@/components/BTextarea/index.vue'

export default {
  data() {
    return {
      file: null,
      form: this.$form.createForm(this, { 
        name: 'edit',
      }),
      okClicked: false,
      fileError: null,
    }
  },
  props: {
      record: Object,
  },
  mounted() {
    if (this.record) {
      const { name, desc } = this.record
      this.form.setFieldsValue({ name, desc })
    }
  },
  components: {
    BInput,
    BTextarea,
  },
  methods: {
    getFileValue(e) {
      console.log('getFileValue--------', e)
      let fileList = [ ...e.fileList ]
      fileList = fileList.slice(-1)
      fileList = fileList.filter(file => file.valid).map(file => {
        if (file.response) {
          file.url = file.response
        }
        return file
      })
      this.file = fileList[0]
      this.updateFileError()
      return fileList
    },
    beforeUpload(file, fileList) {
      console.log('beforeUpload----', file, fileList)
      if (file.size > 1024 * 1024 * 1024) {
        file.valid = false
        this.$message.error('文件大小不能超过1G')
        return false
      }
      file.valid = true
    },
    updateFileError() {
      const file =  this.file
      if (!file) {
        this.fileError = this.okClicked ? '请上传文件' : null
      } else if (this.file.status === 'error') {
        this.fileError = '文件上传有误，请重新上传'
      } else if (this.file.status === 'uploading') {
        this.fileError = this.okClicked ? '请等待上传完成再提交' : null
      }  else {
        this.fileError = null
      }
    },
    fileBtnClick() {
      console.log(this.file.status)
      if (this.file.status === 'uploading') {
        this.form.setFieldsValue({ file: [] })
        this.file = null
      }
    },
    ok(callback) {
      this.okClicked = true
      this.updateFileError()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.record) {
            callback(values)
          } else if (values.file && values.file[0] && values.file[0].status === 'done') {
            callback({ ...values, file: values.file[0] })
          }
        }
      })
    },
  },
};