import { createRouter, createWebHashHistory } from 'vue-router'
// import HomePage from '../views/HomePage.vue'
// import SignUp from './views/Signup.vue'

const routes = [
  {
    path: '/signup',
    // name: 'signup',
    // component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    // component: HomeView
  },
  {
    path: '/',
    name: 'home',
    // component: HomePage
  },
  {
    path: '/id',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    // component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    // component: HomeView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
