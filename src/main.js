import Vue from 'vue'
import {App} from './app'
import router from './router'
import store from './store'

// Bootstrap Framework
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Custom SCSS
import './app/App.scss'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


export const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
