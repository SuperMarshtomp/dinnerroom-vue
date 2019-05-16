import Vue from 'vue'
import Vuex from 'vuex'
import tableList from './modules/tableList'
import users from './modules/users'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    tableList,
    users
  },
})
