import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import UnauthorizedView from "@/views/UnauthorizedView.vue";
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
      meta: { requiresAuth: true },
    },
    {
      path: "/users/create",
      name: "users-create",
      component: () => import("@/views/users/CreateUserView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/users/edit/:id",
      name: "users-edit",
      component: () => import("@/views/users/CreateUserView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/users/delete/:id",
      name: "users-delete",
      component: () => import("@/views/users/DeleteUserView.vue"),
      meta: { requiresAuth: true },
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
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: UnauthorizedView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next({ name: "unauthorized" });
  } else {
    next();
  }
});

export default router;
