// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Include and set up feathers client
const Feathers = require('@feathersjs/feathers')
const authentication = require('@feathersjs/authentication-client')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')

const socket = io('http://localhost:3030/')
// link to the hosted app:
// const socket = io('https://pianio-backend.herokuapp.com')
const feathers = Feathers()
  .configure(socketio(socket))
  .configure(authentication({storage: window.localStorage}))

// Include it as a CommonJS module
const vueFeathers = require('vue-feathers')
// And plug it in
Vue.use(vueFeathers, feathers)

// include validator for input fields
var SimpleVueValidation = require('simple-vue-validator')
// var Validator = SimpleVueValidation.Validator
Vue.use(SimpleVueValidation)

export var Validator = SimpleVueValidation.Validator

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
