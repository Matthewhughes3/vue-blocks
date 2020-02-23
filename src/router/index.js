import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Pages from "../views/Pages";
import Menus from "../views/Menus";
import Dashboard from "../views/Dashboard";
import EditPage from "../views/EditPage";
import EditMenu from "../views/EditMenu";
import { db, auth } from "../firebase";

Vue.use(VueRouter);

let routes = [
  {
    name: "login",
    path: "/vb-login",
    meta: { guest: true },
    component: Login
  },
  {
    name: "dashboard",
    path: "/vb-dashboard",
    meta: { requiresAuth: true },
    component: Dashboard
  },
  {
    name: "pages",
    path: "/vb-dashboard/pages",
    meta: { requiresAuth: true },
    component: Pages
  },
  {
    name: "menus",
    path: "/vb-dashboard/menus",
    meta: { requiresAuth: true },
    component: Menus
  },
  {
    name: "edit-page",
    path: "/vb-dashboard/pages/edit-page",
    meta: { requiresAuth: true },
    props: true,
    component: EditPage
  },
  {
    name: "edit-menu",
    path: "/vb-dashboard/pages/edit-menu",
    meta: { requiresAuth: true },
    props: true,
    component: EditMenu
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      next();
    } else {
      next({ path: "/vb-login" });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (auth.currentUser) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
