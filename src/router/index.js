import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: () =>
      import("../views/HomePage.vue"),
  }, 
  {
    path: "/logIn",
    name: "logIn",
    component: () =>
      import("../views/LogIn.vue"),
  },
  {
    path: "/archive",
    name: "archive",
    component: () =>
      import("../views/Archive.vue"), // archive
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
