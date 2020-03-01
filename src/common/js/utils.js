import { signature } from '../../api/signature'
import { Config } from '../../config'
import Store from 'store'
import uuid from 'uuid/v4'

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

export function getData(el, name, val) {
  let prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

export function isArray(arg) {
  if (typeof arg === 'object') {
      return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return false;
}

/**
 * 读取 DOM 的位置信息
 * @param el DOM 元素
 */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export function generateUUID() {
  return uuid()
}

export function deepClone(data) {
  return JSON.parse(JSON.stringify(data))
}

export function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}

export function isEmptyObject(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return false
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false
    }
  }
  return true
}

export function coverWriteLog() {
  if (process.env.NODE_ENV === 'production' && !Config.log) {
    console.log = function () { };
  }
}

/**
 * 读取 URL query
 * @param name 需要查询的 query 键名
 */
export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const result = window.location.search.slice(1).match(reg)
  if (result !== null) return decodeURI(result[2])
  return null
}
export function getUA(uaType) {
  let ua = navigator.userAgent.toLowerCase()
  switch (uaType) {
    case 'isAndroid':
      return /android/i.test(ua)
    case 'isIOS':
      return /(iphone|ipad|ipod|ios)/i.test(ua)
    case 'isEcloud':
      return /ecloud/i.test(ua)
    case 'isWX':
      return /micromessenger/.test(ua)
    case 'isQQ':
      return /qq/.test(ua) && !(/mqqbrowser/.test(ua))
    case 'isQQBrowser':
      return /mqqbrowser/.test(ua)
    case 'isQzone':
      return /qzone/.test(ua)
    case 'isAlipay':
      return /alipayclient/i.test(ua)
    default:
      return false
  }
}
/**
 * 获取云涛埋点标识
 *
 * @export string
 */
export function getUxtMark() {
  return `${Config.clientType.toUpperCase()}-`
}

/**
 * 处理错误码
 */
export function handleErrorCode(code) {
  let errorCodeInfo = {
    'AccessDenyOfHighFrequency':	'由于访问频率过高，拒绝访问',
    // 'AccessTokenHasExpired':	'AccessToken已过期',
    'AccountNotBind':	'家庭云账号未绑定',
    'AppNotExist':	'合作应用不存在',
    'BusiAccountInvalid':	'业务号不合法',
    'BusiAccountUsed':	'业务号已使用',
    'CancelDeniedPermissions':	'不具备家庭云注销权限',
    'DeleteDeniedPermission':	'不具备家庭云删除权限',
    'FamilyAlreadyBind':	'家庭云已被设备绑定',
    'DeviceAlreadyBind':	'设备与家庭云已绑定',
    'DeviceBindCodeInvaliad':	'设备绑定码错误',
    'DeviceNotBind':	'设备与家庭云未绑定',
    'DeviceNotExist':	'设备不存在',
    'ExitDeniedPermissions':	'不具备家庭云退出权限',
    'FamilyAccessTokenInvalid':	'无效的家庭云AccessToken',
    'FamilyInfoExist':	'家庭云已存在',
    'FileAlreadyExists':	'文件或文件夹已存在',
    'FileCopyToSubFolderError':	'复制文件到子目录错误',
    'FileLengthVerifyFailed':	'文件长度检查错误',
    'FileMD5VerifyFailed':	'文件MD5检查错误',
    'FileNotFound':	'文件或文件夹不存在',
    'FileTooLarge':	'上传文件超过最大限制',
    'ForceDeletePermittionError':	'不具备强力删除权限',
    'GetInputStreamError':	'获取上传流接口错误',
    'GetOOSSiteError':	'获取OOS站点错误',
    'HttpMultiPartErrorCode':	'Http Multi格式错误',
    'InputStreamReadError':	'上传流读取错误',
    'InsufficientStorageSpace':	'剩余存储空间不足',
    'InternalError':	'内部错误',
    'InvalidAccessToken':	'AccessToken无效',
    'InvalidAppSignature':	'无效的appSignature签名',
    'InvalidArgument':	'无效参数',
    'InvalidHttpReq':	'Http Multi格式错误',
    'InvalidParamError':	'无效参数',
    'InvalidParentFolder':	'无效父目录',
    'InvalidPassword':	'密码不正确',
    'InvalidSessionKey':	'无效会话信息',
    'InvalidSignature':	'无效签名',
    'MemberCountExceedLimits':	'家庭云成员个数超过上限',
    'MemberInfoExist':	'成员信息已存在',
    'MemberInfoNotExist':  	'成员信息不存在',
    'MoveFileValidError':	'文件移动类型检查错误',
    'NoSuchUser':	'用户账号不存在',
    'OfflineTaskCreateFailed':	'离线任务创建失败',
    'OpenAccountQueryFailed':	'用户信息查询失败',
    'OpenUserNameNone':	'用户名称为空',
    'OperationFailed':	'操作失败',
    'ParentNotFolder':	'父文件夹类型不正确',
    'PermissionDenied':	'访问权限不足',
    'SaveFileError':	'保存文件错误',
    'ServiceNotOpen':	'云存储服务尚未开通',
    'StorageProviderTypeError':	'资源池类型错误',
    'TaskAlreadyExist':	'设备任务已经存在',
    'TokenNotExist':	'Token不存在',
    'UnknownError':	'未知错误',
    'UploadFileAccessFail':	'断点续传重入错误',
    'UploadFileAccessViolation':	'上传文件访问冲突',
    'UploadFileCompeletedError':	'断点续传文件已完成',
    'UploadFileIdVerifyFailed':	'断点续传文件Id无效',
    'UploadFileNotFound':	'上传文件不存在',
    'UploadFileSaveFailed':	'断点续传记录保存错误',
    'UploadFileStatusVerifyFailed':	'断点续传状态错误',
    'UploadOffsetVerifyFailed':	'断点续传偏移错误',
    'UploadToSwiftError':	'上传到swift错误',
    'UserInfoNotExist':	'天翼云用户信息不存在',
    'FamilyCanNotAccess':	'不允许访问家庭云',
    'FamilyCanNotCreateFamily':	'无法创建家庭云',
    'FamilyBroadbandNotFound':	'宽带账号不存在',
    'FamilyEnjoyPackCanNotOrder':	'无法订购家庭云乐享包',
    'FamilyFlowOrderNotFound':	'家庭云成员未办理定向流量',
    'FamilyUserStatusInvaliad':	'家庭云账号状态无效',
    'FamilyParasDecryptError':	'天翼账号签名解析错误',
    'FamilySignInvaliad':	'天翼账号接口签名无效',
    'FamilyAccessRatesExceedLimit':	'天翼账号接口访问频率太快',
    'FamilyAccessPermissionDenied':	'天翼账号接口权限不足',
    'FamilyMobileInvaliad':	'手机号码无效',
    'FamilyBroadbandNoInvaliad': '宽带账号无效',
    'FamilyBroadbandNoOrderTypeInvalid': '订单类型无效' ,
    'FamilyBroadbandNoOpreateTypeInvalid': '操作类型无效',
    'FamilyBroadbandNoStatusInvalid': '宽带状态无效',
    'FamilyBroadbandNoRateStatusInvalid':	'宽带速率无效',
    'FamilyMobileAlreadyBind': '手机号码已绑定过宽带',
    'FamilyBroadbandNoAlreadyBind': '宽带账号已绑定',
    'FamilyBroadbandNoBindInfoNotFound': '未查询到宽带绑定信息',
    'FamilyBroadbandNoNotFound': '未查询到宽带信息',
    'FamilyBroadbandPwdInvalid': '宽带密码错误',
    'FamilyBroadbandNoValidateFailed': '宽带认证失败',
    'FamilyNotTelcomMobile':	'非电信手机号码',
    'FamilyOrderFlowFailed':	'流量包订购失败',
    'FamilyNoneOrderFlow':	'未订购过流量包',
    'FamilyAlreadyOrderFlow':	'已订购过流量包',
    'FamilyVedioTranscodeFailed':	'家庭云视频转码失败',
    'FamilyTextAuditErrorCode':	'家庭云敏感词检查失败',
    'FamilyOperateFileNumberOverLimit':	'家庭云操作文件个数超过限制',
    'InfoSecurityErrorCode':	'信安检查异常',
    'FileTooLarge':	'单文件太大',
    'InvalidParamError':	'文件对象被清理',
    'InvalidParentFolder':	'父目录错误',
    'UploadFileCompeletedError':	'文件上传状态错误',
    'FileMD5VerifyFailed': '文件MD5校验错误',
    'InputStreamReadError':	'文件输入流错误',
    'InvalidUploadFileStatus': '文件上传状态错误',
    'UploadFileVerifyFailed':	'文件上传状态错误',
    'UploadFileIdVerifyFailed':	'上传ID不存在,fmuploadpartbo获取错误',
    'UploadFileSaveFailed':	'文件保存错误，文件大小和上传大小不一致',
    'UploadToSwiftError':	'写swift错误',
    'CreateFileError':	'创建文件对象错误',
    'UploadFileNotFound':	'上传记录不存在',
    'UploadFileStatusVerifyFailed':	'文件上传状态错误',
    'FamilySpeedQueryError':	'宽带提速信息查询出错',
    'FamilySpeedStartupError':	'启动提速出错',
    'FamilySpeedStopError':	'停止提速出错',
    'FamilySpeedRepeatStartupError':	'用户已经提速，不能再次提速',
    'FamilySpeedRepeatStopError':	'用户已经停止提速，不能再次停止提速',
    'FamilySpeedExistOtherProdError':	'同一线路已经使用其他产品在提速，不能再次提速',
    'FamilySpeedAlreadStop':	'宽带提速已经关闭',
    'FamilyInfoNotExist':	'家庭云不存在',
    'FamilyBroadbandNotGD':  '非广东宽带号码',
    'FamilyUseTimeOver':	'家庭云试用时间到期',
    'FamilyFlowStatusInProcess':	'定向流量包为处理中状态',
    'FamilyEnjoyStatusInProcess':	'乐享包包为处理中状态',
    'FamilyNoneOrderEnjoy':	'未订购过乐享包',
    'FamilyAlreadyOrderEnjoy':	'已订购过乐享包',
    'FamilyFlowPackNotSupportOrder':	'不支持定向流量订购',
    'FamilyAlreadyOrderFlow':	'已订购定向流量包',
    'FamilyExistUnfinishedOrder':	'存在未完成订单，不能办理当前业务',
    'FamilyDeviceNotPreBind':	'设备未进行预绑定',
    'FamilyTaskStatusInvaliad':	'设备任务状态无效',
    'FamilyBroadbandWeakPasswords':	'宽带弱密码',
    'FamilySpeedTimeOver':	'家庭云智能提速时间已经使用完',
    'FamilyIdCardInvaliad':	'身份证无效',
    'FamilySpecialCharacterInvaliad':	'文件包含无效特殊字符',
    'SafeAccessLoginTimeout':	'私密空间文件访问超时',
    'MobileFormatNotCorrect':	'手机号码格式不正确',
    'IptvLoginFail':	'IPTV免密登录失败',
    'GetAreaCodeFail':	'获取地市编码失败',
    'DynamicPwdNotfound':	'动态密码不存在',
    'QrCodeRollLoginFail':	'二维码轮询登录失败',
    'SendTooManyMessagesEveryDay': '每天短信发送次数过多',
    'GetDynamicPwdFail': '获取动态密码失败',
    'UserDayFlowOverLimited':	'用户当日流量超过上限',
    'InsufficientStorageSpace_enjoy':	'乐享包用户断点续传空间不足'
  }

  return errorCodeInfo[code]
}


/**
 * 文件大小格式化
 *
 * @param bytes
 *            文件字节大小
 * @param fixedDigits
 *            格式化小数点位数
 * @param unitFlag
 *            是否输出单位
 * @param floorFlag
 *            是否取整 示例：Utils.formatFileSize(1024 * 1024 + 123)
 */
export function fileSizeFormat(bytes, fixedDigits, unitFlag, floorFlag) {
  if(bytes.toString().search(/B|K|M|G|T/)>-1){
      return;
  }
  let _bytes = parseFloat(bytes);
  let absBytes = Math.abs(_bytes);
  let humanSize, unit;

  if (fixedDigits === undefined) {
      fixedDigits = 2;
  }
  if (unitFlag === undefined) {
      unitFlag = true;
  }

  if (absBytes < 1024) {
      fixedDigits = 0;
      humanSize = _bytes;
      unit = 'B';
  } else {
      if (absBytes < 900 * 1024) {
          humanSize = _bytes / 1024;
          unit = 'K';
      } else {
          if (absBytes < 900 * 1048576) {
              humanSize = _bytes / 1048576;
              unit = 'M';
          } else {
              if (absBytes < 900 * 1073741824
                  || (fixedDigits === 0 && absBytes < 1048576 * 1048576)) {
                  humanSize = _bytes / 1073741824;
                  unit = 'G';
              } else {
                  humanSize = _bytes / (1048576 * 1048576);
                  unit = 'T';
              }
          }
      }
  }
  humanSize = Math.round(humanSize * Math.pow(10, fixedDigits))
      / parseFloat(Math.pow(10, fixedDigits));
  humanSize = humanSize.toFixed(fixedDigits);

  let result;
  if (floorFlag && fixedDigits > 0) {
      if (humanSize !== Math.floor(humanSize)) {
          result = humanSize;
      } else {
          result = parseInt(Math.floor(humanSize), 10);
      }
  } else {
      result = humanSize;
  }
  if (unitFlag) {
      result = result + unit;
  }

  return result;
}

export function isNull(data) {
  if(data != null && data.trim() != ''){
    return false
  }
  return true
}

export function isUnvalidChar(str) {
  if(str == null){
    return false
  }
  var invalidChar = ['\\', '/', '\"', '\'', '&',  '<', '>', '|', '?', '*', ':', '%', '$', '@', '#']
  for (var i = 0; i < invalidChar.length; i++) {
    if (str.indexOf(invalidChar[i]) > -1) {
      return true
    }
  }
  return false
}

/**
 * 透明度 => 16进制
 */
 // => rgba
 export function formatColor(colorList) {
  let color=
    'rgba(' +
    colorList.color[0] +
    ',' +
    colorList.color[1] +
    ',' +
    colorList.color[2] +
    ',' +
    colorList.valpha +
    ')'
    return hexify(color)
}
// rgba => 16进制
function hexify(color) {
  let values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  let a = parseFloat(values[3] || 1),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
}

// 下载url中的&amp;转换为&
export function convertSpecialCharacter(str) {
  let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};

  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
    return arrEntities[t];
  });
}
// 参数查询
export function queryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var p = window.location.href.indexOf("?") > -1 ? window.location.href.split("?")[1] : '';
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else if( p && p.match(reg) !== null){
    return  unescape(p.match(reg)[2]);
  }
  return '';
}
// XSS过滤
export  function filterXSS(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r{0,}\n/g, '<br/>')
}

// 设置cookie
export function setCookie(key, value, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toGMTString()
  document.cookie = key + '=' + value + '; ' + expires
}

// 获取cookie
export function getCookie(key) {
  var name = key + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
  }
  return ''
}

// 删除cookie
export function delCookie(key) {
  var date = new Date();
  date.setTime(date.getTime() - 1);
  var delValue = getCookie(key);
  if (!!delValue) {
    document.cookie = key + '=' + delValue + ';expires=' + date.toGMTString();
  }
}
 
// 是否存在特殊字符
export function hasSpecialCharacter(value) {
  if(!value) {
    return false
  }
  
  let arr = value.split('')
  for(let i=0; i<arr.length; i++) {
    if(!reg.test(arr[i])) {
      return true
    }
  }
  return false
}
export function exitAccount() {
  setTimeout(() => {
    Store.clearAll()
    delCookie('analysis_list')
    delCookie('analysis_cloud')
    window.location.reload()
  }, 1000)
}

/**
 * 将时间戳转换成yyyy-mm-dd hh:mm:ss.SSS格式
 * @param date new Date()获取达到的时间戳
 */
export function timeTrans (date) {
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds()) + '.';
  var ms = (date.getMilliseconds() < 10 ? '00' + date.getMilliseconds() : date.getMilliseconds() < 100 ? '0' + date.getMilliseconds() : date.getMilliseconds());
  return Y+M+D+h+m+s+ms;
}