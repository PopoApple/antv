import BInput from '@/components/BInput/index.vue'
import BTextarea from '@/components/BTextarea/index.vue'
import EditableTags from '@/components/EditableTags/index.vue'
import UploadAvatar from '@/components/UploadAvatar/index.vue'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  props: {
    record: Object,
  },
  mounted() {
    if (this.record) {
      const { name, desc, cover, endTime, tags } = this.record
      this.form.setFieldsValue({ name, desc, cover, endTime, tags })
    }
  },
  components: {
    BInput,
    BTextarea,
    EditableTags,
    UploadAvatar,
  },
  computed: {
    formItemLayout: () => {
      return {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
      }
    },
  },
  methods: {
    ok(callback) {
      this.form.validateFields((err, values) => {
        if (!err) {
          callback({ ...values, endTime: values['endTime'] ? values['endTime'].format('YYYY-MM-DD') : null})
        }
      })
    },
  },
};