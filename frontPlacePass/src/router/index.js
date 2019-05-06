import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import ComponentBase from '@/components/base/base.vue'
import HomePage from '@/components/home/home.vue'
import RegistrationPage from '@/components/auth/auth.vue'
import LoginPage from '@/components/login/login.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated || to.path === '/registration' || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ComponentBase,
      redirect: 'home',
      children: [
        {
          path: '/home',
          name: 'HomePage',
          component: HomePage,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/registration',
          name: 'RegistrationPage',
          component: RegistrationPage,
          beforeEnter: ifNotAuthenticated
        },
        {
          path: '/login/:social_name?',
          name: 'LoginPage',
          component: LoginPage,
          beforeEnter: ifNotAuthenticated
        }
      ]
    }
  ]
})

export default router
