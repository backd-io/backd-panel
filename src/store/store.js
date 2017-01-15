import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {Backd} from './backd'

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
  }
})
