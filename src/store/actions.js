import * as types from './mutation-types'
const actions = {
  setPageTitle({ commit }, title) {
    commit(types.SET_PAGE_TITLE, title)
  }
}

export default actions
