import {GET_CONTENT_LIST} from '../mutation-types'
import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  //isFetching: false,
  tableList: []
}

const mutations = {
  // [REQUEST_CONTENT_LIST] (state) {
  //   state.isFetching = true
  // },
  [GET_CONTENT_LIST] (state, items) {
    //state.isFetching = false
    state.contentList = items.reverse()
  },
  // [GET_CONTENT_LIST_FAILURE] (state) {
  //   state.isFetching = false
  // }
}

const getters = {
  tableList : state => state.contentList
}

const actions = {
  getContentList ({commit}){
    console.log("gittableList")
    //commit(types.REQUEST_CONTENT_LIST)
    axios.get('/articleList').then(response => {
      commit(types.GET_CONTENT_LIST, response.data)
      //console.log(response)
    }, error => {
      commit(types.GET_CONTENT_LIST_FAILURE, error)
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
