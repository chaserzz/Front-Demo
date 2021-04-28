<template>
  <input type="text" name="good" v-model="good" style="height: 20px;width: 200px;"/>
  <consumer />
</template>

<script setup>
import consumer from "./consumer.vue"
import { provide, ref } from "vue"

let good = ref("provide只能在setup中调用")
provide("good",good)  //provide也是组件通信的一种方式，甚至于是响应式的通信

</script>

<style scoped>

</style>