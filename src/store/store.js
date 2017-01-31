import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Backd from 'backd-js'

var backd = new Backd({
  urls: {
    identity: 'http://identity.local.backd.io:8080/v1.0',
    objects: 'http://objects.local.backd.io:8080/v1.0'
  },
  domain: 'backd',
  app: 'backd'
})

export const store = new Vuex.Store({
  state: {
    Backd: backd
  },
  getters: {
    loggedIn (state) {
      return state.Backd.LoggedIn
    },
    currentToken (state) {
      return state.Backd.security['token']
    },
    currentRefreshToken (state) {
      return state.Backd.security['refresh_token']
    },
    currentExpiresAt (state) {
      return state.Backd.security['expires_at']
    }
  }
})
