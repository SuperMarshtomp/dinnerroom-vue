import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = 'api/'
Vue.use(ElementUI)
FastClick.attach(window.document.body)

new Vue({
  router,
  store,
   render: h => h(App),
}).$mount('#app')