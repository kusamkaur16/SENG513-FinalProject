// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueUp from 'vueup' // vue popup plugin

Vue.config.productionTip = false

// Include and set up feathers client
const Feathers = require('@feathersjs/feathers')
const authentication = require('@feathersjs/authentication-client')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const Tone = require('tone')

export const socket = io('http://localhost:3030/')
// link to the hosted app:
// export const socket = io('https://pianio-backend.herokuapp.com')
const feathers = Feathers()
  .configure(socketio(socket))
  .configure(authentication({storage: window.localStorage}))

// Include it as a CommonJS module
const vueFeathers = require('vue-feathers')
// And plug it in
Vue.use(vueFeathers, feathers)

// include validator for input fields
var SimpleVueValidation = require('simple-vue-validator')
Vue.use(SimpleVueValidation)

// use the popup plugin
Vue.use(VueUp)

export var Validator = SimpleVueValidation.Validator
export const synth = new Tone.Synth({
  oscillator: {
    type: 'square'
  },
  filter: {
    'Q': 2,
    'type': 'lowpass',
    'rolloff': -12
  },
  envelope: {
    attack: 0.005,
    decay: 3,
    sustain: 0,
    release: 0.45
  },
  filterEnvelope: {
    attack: 0.001,
    decay: 0.32,
    sustain: 0.9,
    release: 3,
    baseFrequency: 700,
    octaves: 2.3
  }
}).toMaster()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: { a: 1 }
})
