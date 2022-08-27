import { createRouter, createWebHashHistory } from 'vue-router'


import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/HomePage.vue";
import CreatePost from "../views/CreatePost.vue"
import DeletePost from "../views/DeletePost.vue"
import SinglePost from "../views/SinglePost.vue"
import NotFound from "../views/NotFound.vue"


const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta:{
      title: 'Signup'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title: 'Login'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title: 'Home'
    }
  },
  {
    path: '/id',
    name: 'post',
    component: SinglePost,
    props:true,
    meta:{
      title: 'Post'
    }
  },
  {
    path: '/delete',
    name: 'delete',
    component: DeletePost,
    meta:{
      title: 'Modifier un post'
    }
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta:{
      title: 'Créer un post'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 Not Found'
    }

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.afterEach((to) =>{
  document.title = to.meta.title
})
export default router
