import home from "@/views/home/index.vue";
import mine from "@/views/mine/index.vue";
import login from "@/views/login/index.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/home",
    name: "home",
    component: home,
    mata: {
      title: "",
      keepAlive: false,
    },
  },
  {
    path: "/mine",
    name: "mine",
    component: mine,
    mata: {
      title: "",
      keepAlive: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    mata: {
      title: "",
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
