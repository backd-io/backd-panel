// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/common.css'

import 'vue-material/dist/vue-material.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VueLocalStorage from 'vue-localstorage'

import App from './App'

import Home from './components/Home'
import DomainsIndex from './components/domains/Index'

import { store } from './store/store'

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/domains',
      component: DomainsIndex
    }
  ]
})

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueLocalStorage)

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'deep-orange',
      hue: 500
    },
    accent: {
      color: 'orange',
      hue: 800
    },
    warn: 'red',
    background: 'white'
  },
  login: {
    primary: 'deep-orange',
    warn: 'red'
  },
  bars: {
    primary: 'grey',
    warn: 'red'
  }
})

// Vue.material.registerTheme('default', {
//   primary: 'deep-orange',
//   accent: 'blue-grey',
//   warn: 'red',
//   background: 'white'
// })
//
// Vue.material.registerTheme('login', {
//   primary: 'deep-orange',
//   warn: 'red'
// })
//
// Vue.material.registerTheme('bars', {
//   primary: 'grey',
//   warn: 'red'
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  localStorage: {
    token: {
      type: String
    },
    refreshToken: {
      type: String
    },
    expiresAt: {
      type: Number
    }
  }
}).$mount('#app')
