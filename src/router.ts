import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import { createPinia, storeToRefs } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { useCache } from "./libs/useCache";

export const pinia = createPinia();
export const app = createApp(App);
app.use(pinia);

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login.vue"),
      beforeEnter: async (to, _from, next) => {
        const isAuth = await useCache();

        if (to.name === "login" && isAuth) next({ name: "home" });
        else next();
      },
    },
  ],
});
