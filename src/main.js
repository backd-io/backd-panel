// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/modulr.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import Home from './components/Home'

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [{
    path: '',
    component: Home
  }]
})

Vue.use(VueRouter)

import { store } from './store/store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
