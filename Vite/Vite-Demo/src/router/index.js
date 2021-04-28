import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path:'/',
      component: () => import ('../components/Home.vue')
    },
    {
      path:'/profile',
      component: () => import('../components/Profile.vue')
    }
  ]
})

export default router