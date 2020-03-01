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
    title: '内容名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '内容简介',
    dataIndex: 'desc',
    scopedSlots: { customRender: 'desc' },
  },
  {
    title: '上传时间',
    dataIndex: 'time',
    width: 115,
  },
  {
    title: '操作',
    key: 'action',
    width: 230,
    scopedSlots: { customRender: 'action' },
  },
]
const PAGE_SIZE = 10
const TABS = [{
  key: 'tab1', name: '音频', tooltip: '可上架至【畅听】小程序',
},{
  key: 'tab2', name: '视频', tooltip: '可上架至【畅试】小程序',
}]
export default {
  name: 'ContentManage',
  components: {
    Page,
    BSelect,
    LongCell,
    EditForm,
    ExceptionBlock,
  },
  mounted() {
    this.loading = true
    loadAlbumDict().then(albumDict => {
      this.albumDict = albumDict
      if (albumDict.length > 0) {
        this.album = albumDict[0].val
        this.loadListPromise().then(() => {
          this.loading = false
        }, () => {
          this.loading = false
          this.$message.error('数据加载失败')
        })
      } else {
        this.loading = false
      }
    }, () => {
      this.loading = false
      this.$message.error('数据加载失败')
    })
  },
  data() {
    return {
      albumDict: null,
      album: null,
      visible: false,
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
    loadListPromise(album = this.album, key = this.activeKey, page = this.pages[`${album}_${key}`] || 1) {
      const listKey = `${album}_${key}`
      return new Promise((resovle, reject) => {
        loadList({
          album,
          key,
          page
        }).then(res => {
          // const pagination = { ...this.pagination }
          // pagination.total = data.totalCount
          // this.pagination = pagination
          const { data, total } = res
          this.datas[listKey] = data
          this.totals[listKey] = total
          this.pages[listKey] = page
          resovle()
        }, reject)
      })
    },
    loadList(...args) {
      this.loading = true
      this.loadListPromise(...args).then(() => {
        this.loading = false
      }, () => {
        this.loading = false
        this.$message.error('数据加载失败')
      })
    },
    onAlbumChange(e) {
      console.log('onAlbumChange--------', e)
      const album = e
      const listKey = `${album}_${this.activeKey}`
      this.album = album
      if (!this.datas[listKey]) {
        //this.datas[listKey] = []
        this.loadList(album, this.activeKey)
      }
    },
    handleTableChange(key, pagination) {
      console.log('pagination--------', pagination)
      const listKey = `${this.album}_${key}`
      this.pages[listKey] = pagination.current
      //this.datas[listKey] = []
      this.loadList(this.album, key, pagination.current)
    },
    onTabChange(key) {
      console.log('onTabChange--------', this.datas, `${this.album}_${key}`)
      if (!this.datas[`${this.album}_${key}`]) {
        this.loadList(this.album, key)
      }
    },
    getDataSource(key) {
      //console.log('getDataSource--------', this.datas, this.album, key)
      return this.datas[`${this.album}_${key}`]
    },
    showEditModal(record) {
      this.visible = true
      this.currentRecord = record
    },
    onEditOk() {
      this.$refs['editForm'].ok(values => {
        console.log('Received values of form: ', values)
        this.modalLoading = true
        save(values).then(() => {
          this.modalLoading = false
          this.$message.success('保存成功')
          this.visible = false
        }, () => {
          this.modalLoading = false
          this.loading = false
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
        title: '确定要删除该内容吗？',
        content: '删除后运营人员将无法执行上架操作，且您无法找回该内容',
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
          title: '确定要隐藏该内容吗？',
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
    toCreateAlbum() {
      this.$router.push({ path: '/albumManage' })
    },
  },
}