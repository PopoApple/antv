import { get } from './http'

const URL = {
  getUserInfo: 'open/user/getUserInfo.action',
  getFamilyInfo: 'open/family/file/getUserInfo.action',
  getUserInfoExt: 'open/user/getUserInfoExt.action',
  getUserPrivileges: 'open/user/getUserPrivileges.action'
}

export function getUserInfo() {
  return get(URL.getUserInfo)
}

export function getFamilyInfo(params) {
  return get(URL.getFamilyInfo, params)
}

export function getUserInfoExt(params) {
  return get(URL.getUserInfoExt, params)
}

export function getUserPrivileges(params) {
  return get(URL.getUserPrivileges, params)
}
