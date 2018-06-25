// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Utils from './lib/utils'

Vue.use(ElementUI)
Vue.use(Utils)

Vue.config.productionTip = false
axios.defaults.withCredentials = true
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.common['X-Token'] = sessionStorage.getItem('admin-X-Token')

Vue.prototype.$ajax = axios
Vue.prototype.$http = 'http://javadev:8080/adminServer'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
