import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Homepage from '@/views/Homepage'
import Search from '@/views/Search'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Homepage,
      beforeEnter: (to, from, next) => {        
        if (!store.getters.loggedIn) {
          next('login')
        } else {
          next()
        }
      },
      children: [
        {
          path: '',
          component: Search
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
