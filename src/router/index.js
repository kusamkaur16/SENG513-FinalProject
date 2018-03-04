import Vue from 'vue'
import Router from 'vue-router'
import MusicSheet from '@/components/MusicSheet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainApplication',
      component: MusicSheet
    }
  ]
})
