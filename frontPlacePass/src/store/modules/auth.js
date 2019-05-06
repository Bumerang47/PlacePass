import axios from 'axios'
import * as types from '../mutation-types'
import { socialCallbackURL } from '@/store/variables'

const state = {
  token: localStorage.getItem('access-token') || '',
  refresh_token: localStorage.getItem('refresh-token') || '',
  user: {},
  status: '',
  validate: {}
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user,
  token: state => state.token
}

const actions = {
  [types.AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUEST)
      user['username'] = user['email']

      axios.post('/auth/token/obtain/', user)
        .then(resp => {
          const token = resp.data.access
          const refreshToken = resp.data.refresh
          const user = resp.data.user
          localStorage.setItem('access-token', token)
          localStorage.setItem('refresh-token', refreshToken)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit(types.AUTH_SUCCESS, {token, refreshToken, user})

          dispatch(types.USER_REQUEST)
          resolve(resp)
        })
        .catch(err => {
          commit(types.AUTH_ERROR, err)
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          reject(err)
        })
    })
  },
  [types.AUTH_REFRESH]: ({commit, dispatch}, refreshToken) => {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REFRESH)
      axios.post('/auth/token/refresh/', {refresh: refreshToken})
        .then(resp => {
          const token = resp.data.access
          localStorage.setItem('access-token', token)
          localStorage.setItem('refresh-token', refreshToken)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          dispatch(types.USER_REQUEST)
          commit(types.AUTH_SUCCESS, {token, refreshToken})
          resolve(resp)
        })
        .catch(err => {
          commit(types.AUTH_ERROR, err)
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          reject(err)
        })
    })
  },
  [types.USER_REQUEST]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      // commit(types.USER_REQUEST)
      axios.get('/api/user/me/')
        .then(resp => {
          const user = resp.data
          commit(types.USER_UPDATE, user)
          resolve(resp)
        })
        .catch(err => {
          let response = JSON.parse(err.request.response)
          let token = state.refresh_token
          if (response.code === 'token_not_valid' && token) {
            dispatch(types.AUTH_REFRESH, token)
          } else {
            commit(types.AUTH_ERROR, err)
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            reject(err)
          }
        })
    })
  },
  [types.AUTH_SIGNUP]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      user['username'] = user['email']

      axios.post('/api/user/', user)
        .then(resp => {
          const token = resp.data.tokens.access
          const refreshToken = resp.data.tokens.refresh
          delete resp.data.tokens
          const user = resp.data
          localStorage.setItem('access-token', token)
          localStorage.setItem('refresh-token', refreshToken)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit(types.AUTH_SUCCESS, {token, refreshToken, user})
          resolve(resp)
        })
        .catch(err => {
          commit(types.AUTH_ERROR, err)
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          reject(err)
        })
    })
  },
  [types.AUTH_SOCIAL]: ({commit, dispatch}, socialData) => {
    return new Promise((resolve, reject) => {
      let payload = Object.assign(
        {
          code: socialData.code,
          provider: socialData.provider,
          redirect_uri: `${socialCallbackURL}?provider=${socialData.provider}`
        }
      )

      axios.post('/auth/social/jwt-pair-user/', payload)
        .then(resp => {
          const token = resp.data.token
          const refreshToken = resp.data.refresh
          const user = resp.data.member
          localStorage.setItem('access-token', token)
          localStorage.setItem('refresh-token', refreshToken)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit(types.AUTH_SUCCESS, {token, refreshToken, user})
          resolve(resp)
        })
        .catch(err => {
          commit(types.AUTH_ERROR, err)
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          reject(err)
        })
    })
  },
  [types.AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_LOGOUT)
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
const mutations = {
  [types.AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [types.AUTH_SUCCESS]: (state, {token, refreshToken, user}) => {
    state.status = 'success'
    state.token = token
    state.refresh_token = refreshToken
    if (user) {
      state.user = user
    }
  },
  [types.AUTH_ERROR]: (state, err) => {
    state.status = 'error'
    state.validate = Object.assign(state.validate, err.request.response)
  },
  [types.AUTH_LOGOUT]: (state) => {
    state.status = ''
    state.token = ''
  },
  [types.USER_UPDATE]: (state, user) => {
    state.user = user
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
