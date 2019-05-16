import {SET_IS_LOGIN, CLEAR_USER} from '../mutation-types'
import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  name: '',
  islogin: false
}

const mutations = {

  [SET_IS_LOGIN] (state,name) {
    state.name = name
    state.islogin = true
  },
  [CLEAR_USER] (state) {
    state.name = ''
    state.islogin = false
  }
}

const getters = {
  islogin : state => state.islogin
}

const actions = {
    signIn({commit},obj){
      axios.get('/getUser/'+ obj.name).then(
        response => {
            if (obj.password !== response.data.password) {
                commit(types.CLEAR_USER, error)
            }
            else {
                commit(types.SET_IS_LOGIN, obj.name)
            }
        },error => {
            commit(types.CLEAR_USER, error)
        }
      )
    },
    clearUsers({commit}){
        commit(types.CLEAR_USER)
    }
}

export default {
  state,
  mutations,
  getters,
  actions
}
