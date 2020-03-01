import * as types from './mutation-types'
import storage from 'common/js/store'

const mutations = {
  [types.SET_PAGE_TITLE](state, title) {
    state.pageTitle = title
  },
  [types.SET_CURRENT_TAB](state, tab) {
    state.currentTab = tab
  },
  [types.SET_SDK_CONFIG](state, sdkConfig) {
    state.sdkConfig.previewMode = sdkConfig.previewMode
    state.sdkConfig.transEntranceFlag = sdkConfig.transEntranceFlag
    state.sdkConfig.screenFileFlag = sdkConfig.screenFileFlag
    state.sdkConfig.themeId = sdkConfig.themeId
    state.sdkConfig.themeColor.primaryColor = sdkConfig.themeColor.primaryColor
    state.sdkConfig.themeColor.secondaryColor = sdkConfig.themeColor.secondaryColor
    state.sdkConfig.themeColor.thirdColor = sdkConfig.themeColor.thirdColor
  },
  [types.SET_CURRENT_FOLDER_INFO](state, currentFolderInfo) {
    state.currentFolderInfo = currentFolderInfo
  },
  [types.SET_EDIT_FLAG](state, flag = false) {
    state.isEditing = flag
    if (!flag) state.selectedFiles = []
  },
  [types.SET_LOAD_MORE](state, flag = false) {
    state.bLoadMore = flag
  },
  [types.SET_SORT_EDIT_FLAG](state, flag = false) {
    state.isSortEdting = flag
  },
  [types.SET_ALBUM_SORT_NAME](state, albumSortName) {
    state.albumSortName = albumSortName
  },
  [types.SET_APP_MODEL](state, appModel) {
    state.appModel = appModel
  },
  [types.SET_AdAPT_IPHONEX](state, payload) {
    state.isAdaptIphoneXMode = payload
  },
  [types.SET_PREVIEW_FLAG](state, flag = false) {
    state.isPreviewing = flag
  },
  [types.SET_REQUEST_PARAMS](state, requestParams) {
    state.requestParams = requestParams
  },
  [types.SET_REQUEST_PARAMS_ORDERBY](state, orderBy) {
    state.requestParams.orderBy = orderBy
    storage.set('orderBy', orderBy)
  },
  [types.SET_REQUEST_PARAMS_DESCENDING](state, descending) {
    state.requestParams.descending = descending
    storage.set('descending', descending)
  },
  [types.SET_FILES_SHOW_MODE](state, mode) {
    state.showFilesMode = mode
    storage.set('mode', mode)
  },
  [types.SET_SELECTED_FILES](state, selectedFiles) {
    state.selectedFiles = selectedFiles
  },
  [types.ADD_FILE_PATH](state, filePath) {
    state.filePath[filePath.fileId] = filePath.fileName
  },
  [types.ADD_FOLDER_PATH](state, folderPath) {
    state.folderPath[folderPath.folderId] = folderPath.folderName
  },
  [types.DECREASE_FILE_PATH](state) {
    // state.filePath.pop()
  },
  [types.SET_FILE_PATH](state) {
    state.filePath = {}
  },
  [types.SET_FAMILY_INFO](state, familyInfo) {
    storage.set('familyId', familyInfo.familyId)
    state.familyInfo = familyInfo
  },
  [types.SET_FAMILY_LIST](state, familyList) {
    state.familyList = familyList
  },
  [types.SET_USER_VIP_INFO](state, userVipInfo) {
    state.userVipInfo = userVipInfo
  },
  [types.SET_FAMILY_LIST_TYPE](state, type) {
    state.familyListType = type
  },
  [types.SET_FAMILY_TAB_INDEX](state, index) {
    state.familyTabIndex = index
    storage.set('familyTabIndex', index)
  },
  [types.SET_ALBUM_TAB_INDEX](state, index) {
    state.albumTabIndex = index
  },
  [types.SET_FAMILY_FILE_LIST](state, familyFileList) {
    state.familyFileList = familyFileList
  },
  [types.SET_CLOUD_FILE_LIST](state, cloudFileList) {
    state.cloudFileList = cloudFileList
  },
  [types.SET_APPEND_FLAG](state, flag) {
    state.isShowAppendMask = flag
  },
  [types.SET_TABBAR_FLAG](state, flag) {
    state.isShowTabbar = flag
  },
  [types.SET_JUMP_BY_CLICK](state, flag) {
    state.isJumpByClick = flag
  },
  [types.SET_SHOW_SDK_UPLOAD_BTN](state, flag){
    state.showSdkUploadBtn = flag
  },
  [types.SET_USER_INFO](state, userInfo){
    storage.set('userInfo', userInfo)
    state.userInfo = userInfo
  },
}

export default mutations
