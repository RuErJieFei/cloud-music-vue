import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

// 导航钩子，全局钩子
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let isLogin
  if (!token) {
    isLogin = false
  } else {
    isLogin = true
  }
  if (!isLogin) {
    if (to.path !== '/login') {
      return next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      return next({ path: '/' })
    }
    next()
  }
})

Vue.use(VueAxios, axios)

import { Quasar, QDrawer } from 'quasar'

Vue.use(Quasar, {
  components: {
    QDrawer
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
