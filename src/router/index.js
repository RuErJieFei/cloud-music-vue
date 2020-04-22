import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/list',
        name: 'MusicList',
        component: () => import('../views/MusicList.vue')
      },
      {
        path: '/music',
        name: 'Music',
        component: () => import('../views/Music.vue')
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('../views/Role.vue')
      },
      {
        path: '/type',
        name: 'Type',
        component: () => import('../views/Type.vue')
      },
      {
        path: '/song',
        name: 'Song',
        component: () => import('../views/Song.vue')
      },
      {
        path: '/permission',
        name: 'Permission',
        component: () => import('../views/Permission.vue')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/choose',
    name: 'ChooseRole',
    component: () => import('../views/ChooseRole.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
