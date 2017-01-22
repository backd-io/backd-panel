// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/common.css'

import 'vue-material/dist/vue-material.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import App from './App'

import Home from './components/Home'

import { store } from './store/store'

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [{
    path: '',
    component: Home
  }]
})

Vue.use(VueRouter)
Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
