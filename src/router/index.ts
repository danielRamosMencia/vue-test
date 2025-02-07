import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import UsersView from "@/views/users/UsersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/users/create",
      name: "users-create",
      component: () => import("@/views/users/CreateUserView.vue"),
    },
    {
      path: "/users/edit/:id",
      name: "users-edit",
      component: () => import("@/views/users/CreateUserView.vue"), 
    },
    {
      path: "/users/delete/:id",
      name: "users-delete",
      component: () => import("@/views/users/DeleteUserView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
