import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import { db, auth } from '../firebase'

Vue.use(VueRouter)

let routes = [
	{
		name: 'login',
		path: '/vb-login',
		meta: {guest: true},
		component: Login
	},
	{
		name: 'dashboard',
		path: '/vb-dashboard',
		meta: {requiresAuth: true},
		component: Dashboard
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if(auth.currentUser) {
			next()
		} else {
			next({path: '/vb-login'})
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if(auth.currentUser) {
			next({path: '/'})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
