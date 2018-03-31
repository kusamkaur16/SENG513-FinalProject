// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const Tone = require('tone');
const synth = new Tone.Synth({
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.4,
        release: 4
    }
}).toMaster();

console.log('started');
console.log('started synth', synth);
Vue.use(Tone , synth);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
