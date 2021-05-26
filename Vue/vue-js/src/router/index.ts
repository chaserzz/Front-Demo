import { createRouter, createWebHashHistory , createWebHistory} from "vue-router"
const router = createRouter({
  history: createWebHashHistory(),  //创建hash类型的路由   //createWebHistory 创建history类型的路由,
  routes:[{
    path: '/',
    redirect: '/base'
  },
    {
      path: '/base',
      name: "Base",
      component: () => import ("../baseUse/index.vue")
    },
    {
      path:'/vuex',
      name: "Vuex",
      component: () => import ("../vuex/demo.vue")
    },
    {
      path:'/axios',
      name: "Axios",
      component: () => import ("../axios/index.vue")
    },
    {
      path:"/eventbus",
      component: () => import ("../eventBus/views/index.vue")
    },
    {
      path: "/asynCom",
      component: () => import ("../asyncCom/index.vue")
    },
    {
      path:"/directive",
      component: () => import("../direct/index.vue")
    },
    // {
    //   path:"/function",
    //   component: () => import ("../funCom/index.vue")
    // },
    {
      path: "/template",
      component: () => import ("../temple/index.vue")
    },
    {
      path: "/watch",
      component: () => import ("../watchAndWatchEffect/index.vue")
    },
    {
      path: "/providerAndInject",
      component: () => import ("../provide/index.vue")
    },
  ]
})

//  路由守卫
// router.beforeEach((to,form,next) => {
//   //对/的路径进行重定向
//   if(to.fullPath === "/"){
//     to.fullPath = "/base"
//    next()
//   }else{
//     next()
//   }
// })

export default router