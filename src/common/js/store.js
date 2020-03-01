const store = require('store')

export default {
  
  set(key, value) {
    store.set(key, value)
  },

  get(key) {
    return store.get(key)
  },

  remove(key) {
    store.remove(key)
  },

  clear() {
    store.clearAll()
  }
}
