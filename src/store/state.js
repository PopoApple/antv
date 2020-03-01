import { STYLE } from '../config'
import storage from 'common/js/store'

const state = {
  appModel: STYLE, // APP 展示模式
  currentTab: '',
  pageTitle: '', // 页面标题（Header）
  familyInfo: {},
  userVipInfo: {}, // 会员特权信息
  familyList: [],
  familyListType: 'selectFamily',
  familyTabIndex: storage.get('familyTabIndex') || 0,
  albumTabIndex: 1,
  familyFileList: [],
  cloudFileList: [],
  isShowAppendMask: false,
  currentFolderInfo: {}, // 当前文件夹的信息，包括 filesLength, folderId, pageNum, pageSize, recordCount
  requestParams: {
    // 空或 //1：按照文件名称排序 3：按照文件最后操作时间排序
    // true 降序 false升序
    orderBy: storage.get('orderBy') || 3,
    descending: storage.get('descending') || true
  },
  showFilesMode: storage.get('mode') || 1, // 1：列表模式显示 2：缩略图模式显示
  isEditing: false, // 是否处于编辑模式
  bLoadMore: true, // 全选状态下是否可加载更多
  isShowTabbar: true, // 是否显示底部tabbar
  isSortEdting: false, // 是否处于二级智能相册重命名模式
  isPreviewing: false, // 是否处于预览图片模式
  isJumpByClick: true, // 是否通过点击事件进行路由跳转
  isAdaptIphoneXMode: false, // 是否处于适配IphoneX模式
  albumSortName: '',
  selectedFiles: [],
  filePath: {},
  folderPath: {},
  sdkConfig: {
    previewMode: {
      music: false,
      video: false,
      picture: false,
      document: false
    },
    transEntranceFlag: 1,
    screenFileFlag: 0,
    themeId:'',
    themeColor: {
      primaryColor: '',
      secondaryColor: '',
      thirdColor: ''
    }
  },
  showSdkUploadBtn: false,
  /** /
   * room 已用空间/空间 0B/15.13G
   * percentage 使用百分比  5%
   */
  userInfo: {},// 用户信息
}

export default state
