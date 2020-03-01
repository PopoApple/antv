import { loadList, loadAlbumDict, save, deleteRecord, cancelHide, hide } from './api'
import Page from '@/components/Page/index.vue'
import BSelect from '@/components/BSelect/index.vue'
import LongCell from '@/components/LongCell/index.vue'
import EditForm from './EditForm/index.vue'
import ExceptionBlock from '@/components/ExceptionBlock/index.vue'

const COLUMNS = [
  {
    title: '序列',
    dataIndex: 'no',
    width: 60,
  },
  {
    title: '专辑名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '专辑简介',
    dataIndex: 'desc',
    scopedSlots: { customRender: 'desc' },
  },
  {
    title: '专辑封面',
    dataIndex: 'cover',
    width: 90,
    scopedSlots: { customRender: 'cover' },
  },
  {
    title: '专辑有效时间',
    dataIndex: 'time',
    width: 120,
  },
  {
    title: '自定义专辑标签',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '操作',
    key: 'action',
    width: 230,
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
  },
]
const PAGE_SIZE = 10
const TABS = [{
  key: 'tab1', name: '音频', tooltip: '可上架至【畅听】小程序',
},{
  key: 'tab2', name: '视频', tooltip: '可上架至【畅视】小程序',
}]
export default {
  name: 'AlbumManage',
  components: {
    Page,
    BSelect,
    LongCell,
    EditForm,
    ExceptionBlock,
  },
  mounted() {
    this.loadList()
  },
  data() {
    return {
      modalVisible: false,
      modalLoading: false,
      currentRecord: null,
      activeKey: TABS[0].key,
      loading: false,
      datas: {},
      totals: {},
      pages: {},
    }
  },
  computed: {
    TABS: () => TABS,
    COLUMNS: () => COLUMNS,
    PAGE_SIZE: () => PAGE_SIZE,
  },
  methods: {
    loadList(key = this.activeKey, page = this.pages[key] || 1) {
      this.loading = true
      loadList({
        key,
        page
      }).then(res => {
        this.loading = false
        const { data, total } = res
        this.datas[key] = data
        this.totals[key] = total
        this.pages[key] = page
      }, () => {
        this.loading = false
        this.$message.error('数据加载失败')
      })
    },
    handleTableChange(key, pagination) {
      console.log('pagination--------', pagination)
      this.pages[key] = pagination.current
      this.datas[key] = []
      this.loadList(key, pagination.current)
    },
    onTabChange(key) {
      console.log('onTabChange--------', this.datas, key)
      if (!this.datas[key]) {
        this.loadList(key)
      }
    },
    showEditModal(record) {
      this.modalVisible = true
      this.currentRecord = record
    },
    onEditOk() {
      this.$refs['editForm'].ok(values => {
        console.log('获得表单数据--------', values)
        this.modalLoading = true
        save(values).then(() => {
          this.modalLoading = false
          this.$message.success('保存成功')
          this.modalVisible = false
        }, () => {
          this.modalLoading = false
          this.$message.error('保存失败')
        })
      })
    },
    handleDelete(no) {
      this.$confirm({
        okType: 'danger',
        cancelText: '取消',
        class: 'common-danger-confirm', 
        centered: true,
        title: '确定要删除该专辑吗？',
        content: '删除后运营人员将无法执行上架操作，且您无法找回该专辑',
        okText: '删除',
        onOk:() => {
          this.loading = true
          deleteRecord(no).then(() => {
            this.$message.success('删除成功')
            this.loadList()
          }, () => {
            this.loading = false
            this.$message.error('操作失败')
          })
        },
      })
    },
    handleHide({ no, hidden }) {
      if (hidden) {
        this.loading = true
        cancelHide(no).then(() => {
          this.$message.success('已取消隐藏')
          this.loadList()
        }, () => {
          this.loading = false
          this.$message.error('操作失败')
        })
      } else {
        this.$confirm({
          okType: 'danger',
          cancelText: '取消',
          class: 'common-danger-confirm', 
          centered: true,
          title: '确定要隐藏该专辑吗？',
          content: '隐藏后运营人员将无法执行上架操作',
          okText: '隐藏',
          onOk:() => {
            this.loading = true
            hide(no).then(() => {
              this.$message.success('已隐藏')
              this.loadList()
            }, () => {
              this.loading = false
              this.$message.error('操作失败')
            })
          },
        })
      }
    },
  },
}