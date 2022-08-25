import { createRouter, createWebHashHistory } from 'vue-router'


import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/HomePage.vue";
import CreatePost from "../views/CreatePost.vue"
import DeletePost from "../views/DeletePost.vue"
import LikePost from "../views/LikePost.vue"


const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/id',
    name: 'post',
    component: LikePost
  },
  {
    path: '/delete',
    name: 'delete',
    component: DeletePost
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
