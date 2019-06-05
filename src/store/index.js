import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {},
		loginInfo: {
			is: false,
			state: "login",
			show: false
		},
  },
  mutations: {
    SET_USER_INFO (state, obj) {
      if (typeof obj === 'object') {
        state.data = obj
      }
    },
    SET_USER_KEY_VALUE (state, obj) {
      if (obj.hasOwnProperty('key') && obj.hasOwnProperty('value')) {
        state.data[obj.key] = obj.value
      }
    },
		setLogin(state,login){
			state.loginInfo.state = login.state!==undefined ? login.state : state.loginInfo.state;
			state.loginInfo.show = login.show!==undefined ? login.show : state.loginInfo.show;
			state.loginInfo.is = login.is!==undefined ? login.is : state.loginInfo.is;
		}
  },
  actions: {
    set_userInfo: ({ commit }, obj) => {
      commit('SET_USER_INFO', obj)
    },
    set_userInfo_keyValue: ({ commit }, obj) => {
      commit('SET_USER_KEY_VALUE', obj)
    },
		
  }
})
