import { getUA } from '../common/js/utils'
export const currentModule = state => state.route.name // 当前模块名
// 区分相册模块
export const albumModule = (state) => {
  let name
  const isEsmarthome = getUA('isEsmarthome')
  const isFamily = !isEsmarthome ? state.albumTabIndex === 1 : state.albumTabIndex === 0
  const isCloud = !isEsmarthome ? state.albumTabIndex === 0 : state.albumTabIndex === 1

  if (isFamily) {
    name = 'family'
  }
  if (isCloud) {
    name = 'cloud'
  }

  return { isCloud, isFamily, name }
}