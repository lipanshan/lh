import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
  解决刷新页面后vuex 数据丢失
*/
const KEYMAN_LOCAL_DATA = 'keyMan'
const localstorageData = window.localStorage.getItem(KEYMAN_LOCAL_DATA) ? JSON.parse(window.localStorage.getItem(KEYMAN_LOCAL_DATA)) : {
  token: '',
  userType: '',
  memberId: ''
}
const mutations = {
  syncSetToken(state, token) {
    state.token = token
    updateLocalData(state)
  },
  syncSetUsetType(state, type) {
    state.userType = type
    updateLocalData(state)
  },
  syncSetMemberId(state, id) {
    state.memberId = id
    updateLocalData(state)
  }
}
const actions = {
  asyncSetToken({ commit, state }, token) {
    commit('token', token)
    updateLocalData(state)
  },
  asyncSetUsetType({ commit, state }, type) {
    commit('userType', token)
    updateLocalData(state)
  },
  asyncSetMemberId({ commit, state }, id) {
    commit('memberId', id)
    updateLocalData(state)
  }
}
const getters = {
  getToken(state) {
    return state.token
  },
  getUserType(state) {
    return state.userType
  },
  getMemberId(state) {
    return state.memberId
  }
}
const updateLocalData = (data) => {
  const copyData = JSON.stringify(data)
  window.localStorage.setItem(KEYMAN_LOCAL_DATA, copyData)
}
const state = localstorageData

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})