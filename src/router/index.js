import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Home from '@/components/home'
import Person from '@/components/person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登陆',
      component: Login
    },{
      path: '/main',
      component: Main,
      children:[
        { path: '/main/home', component: Home},
        { path: '/main/person', component: Person},
      ]
    }
  ]
})
