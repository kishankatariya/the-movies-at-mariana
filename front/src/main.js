import Vue from 'vue'
import vuetify from '@/plugin/vuetify'

import App from './App.vue'

import './filter/index'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
