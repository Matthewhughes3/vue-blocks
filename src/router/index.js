import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { db } from '../firebase'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
