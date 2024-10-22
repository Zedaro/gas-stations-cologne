import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "map" },
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../components/MapView.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("../components/ListView.vue"),
    },
    {
      path: "/dox",
      name: "documentation",
      component: () => import("../components/DocumentationPage.vue"),
    },
  ],
})

export default router
