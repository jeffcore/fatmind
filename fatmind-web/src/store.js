import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3002/api'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: '',
    quantum: '',
    quantumList: '',
    token: '',
    loginAPIError: false,
    registerAPIError: false,
    apiErrorMessage: ''
  },
  getters: {
    loggedIn (state) {
      return Boolean(state.token)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      // console.log('token ' + token)
      state.token = token
    },
    setQuantumList (state, quantumList) {
      state.quantumList = quantumList
    },
    updateQuantumList (state, payload) {
      console.log(payload.id);
      for (let i = 0; i <state.quantumList.length; i++) {
        if (state.quantumList[i]._id == payload.id) {
          state.quantumList[i].note = payload.note;
        }
      }
    },
    addQuantumList (state, payload) {
      state.quantumList.unshift(payload);
    },
    setLoginAPIError (state, loginAPIError) {
      state.loginAPIError = loginAPIError
    },
    setRegisterAPIError (state, registerAPIError) {
      state.registerAPIError = registerAPIError
    },
    setUserEditAPIError (state, userEditAPIError) {
      state.userEditAPIError = userEditAPIError
    },
    setAPIErrorMessage (state, apiErrorMessage) {
      state.apiErrorMessage = apiErrorMessage
    },
    setPasswordChangeAPIError (state, passwordChangeAPIError) {
      state.passwordChangeAPIError = passwordChangeAPIError
    }
  },
  actions: {
    createQuantum: (context, payload) => {
      var config = {
        url: '/quantum',
        method: 'post',
        headers: {'x-access-token': context.state.token,
          'x-api-key': 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04',
          'content-type': 'application/json'},
        data: payload
      }
      // console.log(context.state.token)
      // console.log(payload)
      axios(config)
        .then(response => {          
          // console.log(response)
          context.commit('addQuantumList', response.data.data)          
          router.push('/').catch(err => {})
        })
        .catch(e => {
          
          // console.log(e)
        })
    },
    getQuantums: (context) => {
      var config = {
        url: '/quantum/',
        method: 'get',
        headers: {'x-access-token': context.state.token,
          'x-api-key': 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04'}
      }
      setTimeout(() => {
        axios(config)
          .then(response => {
            // console.log(response)
            context.commit('setQuantumList', response.data.data)
          })
          .catch(e => {
            // console.log(e)
          })
      }, 1000)
    },
    editQuantum: (context, payload) => {
      var config = {
        url: '/quantum/' + payload.id,
        method: 'put',
        headers: {'x-access-token': context.state.token,
          'x-api-key': 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04'},
        data: payload
      }
      setTimeout(() => {
        axios(config)
          .then(response => {
            // console.log(response)
            context.commit('updateQuantumList', payload);            
          })
          .catch(e => {
            console.log(e)
          })
      }, 1000)
    },
    deleteQuantum: (context, payload) => {
      // console.log(payload)
      var config = {
        url: '/quantum/' + payload.id,
        method: 'delete',
        headers: {'x-access-token': context.state.token,
          'x-api-key': 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04'}
      }
      setTimeout(() => {
        axios(config)
          .then(response => {
            // console.log(response)
            // context.commit('setQuantumList', response.data.data)
          })
          .catch(e => {
            // console.log(e)
          })
      }, 1000)
    },
    searchQuantum: (context, payload) => {
      var config = {
        url: '/search/',
        method: 'post',
        headers: {'x-access-token': context.state.token,
          'x-api-key': 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04',
          'content-type': 'application/json'},
        data: payload
      }
      setTimeout(() => {
        axios(config)
          .then(response => {
            // console.log(response)
            context.commit('setQuantumList', response.data.data)
          })
          .catch(e => {
            // console.log(e)
          })
      }, 1000)
    },
    login: (context, payload) => {
      var config = {
        url: '/login',
        method: 'post',
        headers: {'content-type': 'application/json',
          'x-api-key': 'aD7WrqSxV8ur7C59Ig6gf72O5El0mz04'},
        data: payload
      }
      axios(config)
        .then(response => {
          // console.log(response)
          // context.commit('setLoginAPIError', false)
          context.commit('setToken', response.data.token)
          router.push('/').catch(err => {})
        })
        .catch(e => {
          // console.log(e)
          // context.commit('setLoginAPIError', true)
          // context.commit('setAPIErrorMessage', e.response.data.message)
          // router.push('/login')
        })
    },
    logout: (context) => {
      context.commit('setToken', '')
      context.commit('setUser', '')
      router.push('/login')
    }
  }
})
