<template>
  <div>
    <async-page />
  </div>
</template>

<script setup>
import { defineAsyncComponent }  from "vue"  //定义异步组件
import ErrorComponent from './ErrorComponent.vue'
import LoadingComponent from './LoadingComponent.vue'

  // 创建异步组件是在ssr的情况下，发送网络请求获得组件来降低服务器的压力
  
  const asyncPage = defineAsyncComponent({
    loader: () => import("./asyncChild.vue"),
    delay: 2000,
    timeout: 300000,  
    errorComponent: ErrorComponent,   //组件出现错误渲染
    loadingComponent: LoadingComponent  //组件加载时渲染
  })
</script>

<style scoped>

</style>