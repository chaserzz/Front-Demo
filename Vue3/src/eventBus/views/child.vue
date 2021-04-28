<template>
  <div>
    <span @click="childClick">我是子组件,点击我</span>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"
const app = getCurrentInstance()
//将bus的emit事件与span的click事件绑定到一起
function childClick(){
  app.ctx.$bus.$emit("childClick","子组件点击事件触发")
}
</script>

<style scoped>

</style>