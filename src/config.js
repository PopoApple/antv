export const STYLE = 'app' // 云盘展示模式，browser 或 app
export const PAGE_SIZE = 30 // 分页大小
export const BATCH_INTERVAL = 1000 // 批处理接口定时器间隔

export const Config = {
  // accessToken（仅开发阶段调试用）
  accessToken: '191FC42B9DB3D72D48BDB9C569B8EF8A',
  version: 'v1.0.0',
  // 域名
  domain: {
    // 平台 API 接口
    api: 'https://api.cloud.189.cn',
    // 图片预览接口
    preview: 'https://preview.cloud.189.cn',
    // 图片预览接口（投屏）
    previewScreen: 'http://preview.cloud.189.cn',
    // 云图 API 接口（云相册智能分类）
    yuntu: 'https://api.yuntu.21cn.com',
    // H5 云盘页面静态服务器
    h5: 'https://h5.cloud.189.cn/'
  },
  url: {
    // 应用入口
    entry: './main.html',
    // 未登录缺省页
    nologin: './index.html'
  },
  upload: {
    fileSizeLimited: 100*1024*1024,
    fileTypeAccepted: 'image/*'
  },
  uxtDataType: 'cloudMsg',//云涛自定义数据上报，数据主题(和云涛协定所得)
  clientType: 'cloudopen'
}
